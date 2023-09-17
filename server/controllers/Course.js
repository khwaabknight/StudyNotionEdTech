const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { deleteImagefromCloudinary } = require("../utils/imageDelete");

//  createCourse handler function
exports.updateCourse = async (req,res) => {
    try {

        // fetch data
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        // If Thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }
        
        await course.save();

        const updatedCourse = await Course.findOne({_id: courseId,})
            .populate({
              path: "instructor",
              populate: {
                path: "additionalDetails",
              },
            })
            .populate("category")
            .populate("ratingsAndReviews")
            .populate({
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            })
            .exec()

        return res.status(200).json({
            success:true,
            message:"Course Updated Successfully",
            data:updatedCourse,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Failed to update course, please try again",
        })
    }
}

exports.createCourse = async (req,res) => {
    try {

        // fetch data
        let {courseName, courseDescription,learnings,price,category,tag,status,instructions} = req.body;
        // get thumbnail
        const thumbnail = req.files.thumbnail;
        // validation
        if(!courseName || !courseDescription || !learnings || !price || !category || !thumbnail || !tag){
            return res.status(400).json({
                success:false,
                message:"Some fields are missing in the create course form. All fields are mandatory, Please fill all fields."
            });
        }
        if (!status || status === undefined) {
			status = "Draft";
		}

        
        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId,{accountType:"Instructor"});
        console.log("Instructor Details: ", instructorDetails);
        // TODO : verify that userId and instructor details are same or different ?

        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:"Instructor Details not found",
            })
        }


        // check if given category is valid or not 
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:"Category Details not found",
            })
        }

        // Upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        console.log(thumbnailImage);

        
        // create and entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            learnings,
            price,
            tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status,
			instructions,
        });

        // add the new course to the user schema of Instructor
        await User.findByIdAndUpdate({_id: instructorDetails._id},{
            $push:{
                courses:newCourse._id,
            }
        },{new:true});

        // update category schema : todo 
        await Category.findOneAndUpdate({_id:category},{
            $push:{
                course:newCourse._id,
            }
        },{new:true});


        // return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Failed to create course, please try again",
        })
    }
}

// getAllCourses handler function
exports.getAllCourses = async (req,res) => {
    try {
        const allCourses = await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingsAndReviews:true,
            studentsEnrolled:true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data:allCourses,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch courses please try again",
            error:error.message,
        });
    }
}

// get course details by course id
exports.getCourseDetails = async (req,res) => {
    try {
        // get course id 
        const {courseId} = req.body;
        // find course details
        const courseDetails = await Course.find({_id:courseId}).populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                },
            }
        )
        .populate("category")
        .populate("ratingsAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();

        // validation
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            })
        }

        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:courseDetails,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id
        const courseDetails = await Course.findOne({
        _id: courseId,
        })
        .populate({
            path: "instructor",
            populate: {
            path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingsAndReviews")
        .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            },
        })
        .exec()

        // let courseProgressCount = await CourseProgress.findOne({
        // courseID: courseId,
        // userId: userId,
        // })

        // console.log("courseProgressCount : ", courseProgressCount)

        if (!courseDetails) {
        return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
        })
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        // let totalDurationInSeconds = 0
        // courseDetails.courseContent.forEach((content) => {
        // content.subSection.forEach((subSection) => {
        //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
        //     totalDurationInSeconds += timeDurationInSeconds
        // })
        // })

        // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
        success: true,
        data: {
            courseDetails,
            // totalDuration,
            // completedVideos: courseProgressCount?.completedVideos
            // ? courseProgressCount?.completedVideos
            // : [],
        },
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        success: false,
        message: error.message,
        })
    }
}

// get Instructor courses
exports.getInstructorCourses = async (req,res) => {
    try {
        const instructorId = req.user.id;
        const instructorCourses = await Course.find({instructor:instructorId}).populate("instructor").exec();

        if(!instructorCourses) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${instructorId}`,
            })
        }

        return res.status(200).json({
            success:true,
            message:"Instructor Courses fetched successfully",
            data:instructorCourses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

// delete course handler function
exports.deleteCourse = async (req,res) => {
    try {
        const {courseId} = req.body;
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            success:true,
            message:"Course deleted successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}