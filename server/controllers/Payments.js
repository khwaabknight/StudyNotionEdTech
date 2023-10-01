const { default: mongoose } = require('mongoose');
const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
const crypto = require("crypto")


// initiate the eazorpay order
exports.capturePayment = async(req,res) => {
    const {courses} = req.body
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.status(404).json({
            success:false,
            message:"Please provide course id",
        });
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course) {
                console.log("Could not find the course",course_id)
                return res.status(400).json({
                    success:false,
                    message:"Could not find the course",
                });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                console.log("student is already enrolled in course",uid)
                return res.status(200).json({
                    success:false,
                    message:"student is already enrolled in course"
                })
            }

            totalAmount += course.price;

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now().toString()),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        
        return res.json({
            success:true,
            message:"order for payment created",
            data:paymentResponse,
        })

    } catch (error) {
        console.log("capture payment error",error);
        return res.status(500).json({
            success:false,
            message:"Could not initiate order",
            error:error.message,
        })
    }
}

// verify the payment
exports.verifyPayment = async(req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const courses = req.body?.courses;
    const userId = req.user.id;

    if(
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(400).json({
            success:false,
            message:"Payment failed",
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if(expectedSignature === razorpay_signature){
        // enroll students in course
        await enrollStudent(courses,userId,res);

        // return response
        return res.status(200).json({
            success:true,
            message:"Payment verified",
        })
    }

    return res.status(500).json({
        success:false,
        message:"Payment failed"
    })
}

const enrollStudent = async(courses,userId,res) => {
    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide daa for courses and userId",
        })
    }

    for(const courseId of courses) {
        try {
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push : {studentsEnrolled:userId}},{new:true});

            if(!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                });
            }

            // find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {$push:{
                    courses:courseId,
                }},{new:true})

            // send mail to student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfuly Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            )
            
            console.log("Email sent successfully",emailResponse.response)
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({success:false,message:error.message});
        }
    }
}

exports.sendPaymentSuccessEmail = async(req,res) => {
    const {orderId,paymentId,amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success:false,
            message:"Please provide all the fields"
        })
    }

    try {
        
        // find student
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            "Payment Recieved",
            paymentSuccessEmail(`${enrolledStudent.firstName} ${enrolledStudent.lastName}`,amount/100,orderId,paymentId)
        )
        
        return res.status(200).json({
            success:true,
            message:"Payment success email sent successfully",
        })

    } catch (error) {
        console.log("error in sending mail", error);
        return res.status(500).json({
            success:false,
            message:"Could not send email",
        })
    }
}

// // capture the payment and initiate the razorpay order
// exports.capturePayment = async (req,res) => {
//     // get courseId and UserId
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     // validation -> courseId
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     }
//     let course;
//     try {
//         // validate course details
//         course = await Course.findById(course_id);
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:"Could not find the course",
//             });
//         }
//         // validate ifUserHasAlreadyPaid
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success:false,
//                 message:"Student is already enrolled"
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }
//     // order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount*100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId,
//         }
//     }

//     try {
//         // initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
        
//         // return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });


//     } catch (error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         })
//     }
// }

// // verify signature of razorpay and server 

// exports.verifySignature = async (req,res) => {
//     const webhookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];
 
//     const shasum = crypto.createHmac("sha256",webhookSecret); // SHA
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest) {
//         console.log("Payment is Authorized");

//         const {courseId,userId} = req.body.payload.payment.entity.notes;

//         try {
//             // find the course and enroll the student in it
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id:courseId},
//                 {$push:{studentsEnrolled:userId}},
//                 {new:true},
//             );

//             if(!enrolledCourse) {
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found",
//                 });
//             }

//             console.log(enrolledCourse);

//             // find the student and add th ecourse in thier list of enrolled courses
//             const enrolledStudent = await User.findOneAndUpdate(
//                 {_id:userId},
//                 {$push:{courses:courseId}},
//                 {new:true},
//             );
//             console.log(enrolledStudent);

//             // mail send confirmation
//             const emailResponse = await mailSender(enrolledStudent.email,"Congratulations from study notion","Congratulations you are enrolled into course");
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature verified and course added",
//             });
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid request", 
//         })
//     }
// }