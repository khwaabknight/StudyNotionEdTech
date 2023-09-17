const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    
    courseName: {
        type:String,
    },
    courseDescription: {
        type:String,
    },
    instructor: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    learnings: {
        type:String,
    },
    courseContent: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingsAndReviews: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingsAndReviews",
        }
    ],
    price: {
        type: Number,
    },
    thumbnail:{
        type:String,
    },
    tag: {
        type: [String],
        required:true,
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category",
    },
    studentsEnrolled: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ['Draft', 'Published'],
        default: 'Draft',
	},
});

module.exports = mongoose.model("Course", courseSchema);