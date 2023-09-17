const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// account delete schedule and update profile picture pending

exports.updateProfile = async (req,res) => {
    try {
        // get data
        const {firstName, lastName,dateOfBirth = "", about = "",countryCode = "" ,contactNumber="",gender=null} = req.body;
        // get userId
        const id = req.user.id;
        // find profile
        const userDetails = await User.findById(id).populate('additionalDetails').exec();
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        if(firstName){
            userDetails.firstName = firstName;
        }
        if(lastName){
            userDetails.lastName = lastName;
        }
        await userDetails.save();

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.countryCode = countryCode;
        profileDetails.gender = gender;
        await profileDetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Internal server error",
            error:error.message,
        })
    }
}

// delete account
exports.deleteAccount = async (req,res) => {
    try {


        // try to schedule this job cron-job , node-schedule
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.status(400).json({
                success:false,
                message:"User not found",
            });
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        
        // todo :HW unenroll user from all enrolled courses
        if(userDetails.accountType === "Student"){
            userDetails.courses.forEach(async (courseid) => {
                await Course.findOneAndUpdate({_id:courseid},{
                    $pull:{
                        studentsEnrolled:userDetails.id
                    }
                },{new:true});
            });
        }
        // delete user // cronjob , node-schedule
        await User.findByIdAndDelete({_id:id});
        // return response
        return res.status(200).json({
            success:true,
            message:"User deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted due to server error",
        })
    }
}


// get all user details
exports.getAllUserDetails = async (req,res) => {
    try {
        // get user id
        const id = req.user.id;
        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"User Data fetched successfuly",
            userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// update display picture
exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        ).populate('additionalDetails').exec();
        res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// get all enrolled courses
exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findOne({
            _id: userId,
        }).populate("courses").exec();
        if (!userDetails) {
            return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
            })
        };
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};