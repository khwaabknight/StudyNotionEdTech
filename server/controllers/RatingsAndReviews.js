const RatingsAndReviews = require("../models/RatingsAndReviews");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// createRating
exports.createRating = async (req,res) => {
    try {
        // get user id
        const userId = req.user.id;
        // fetchdata from req.body
        const {rating,review,courseId} = req.body;
        // check if user is enrolled or not
        const courseDetails = await Course.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}})
        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            })
        }
        // check if user already reviewed
        const alreadyReviewed = await RatingsAndReviews.findOne({user:userId,course:courseId});
        // create rating and review
        const currRating = RatingsAndReviews.create({
            user:userId,
            rating:rating,
            review:review,
            course:courseId,
        });
        // update course with this rating and review
        await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    ratingsAndReviews:(await currRating)._id,
                }
            });
        // return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// getAverageRating
exports.getAverageRating = async (req,res) => {
    try {
        // get course Id
        const courseId = req.body.courseId;
        // calculate avg rating
        const result = await RatingsAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "$rating"},
                }
            }
        ])
        // return rating
        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                averageRating : result[0].averageRating,
            })
        }

        // if no rating/Review exists
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given tilll now',
            averageRating:0,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// getAllRating
exports.getAllRating = async (req,res) => {
    try {
        const allReviews = await RatingsAndReviews.find({}).sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image", // in this way we can select particular fields which we want to respond with
        })
        .populate({
            path:"course",
            select:"courseName",
        }).exec();
        // return response 
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data: allReviews,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,  
        })
    }
}

// getCourseRatings