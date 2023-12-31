// Import the required modules 
const express = require("express");
const router = express.Router();
const { auth, isInstructor } = require("../middlewares/auth")
const {deleteAccount,updateProfile,getAllUserDetails,updateDisplayPicture,getEnrolledCourses,instructorDashboard} = require("../controllers/Profile");


/*       Profile Routes        */
// Delete User Account
router.delete("/deleteProfile", auth, deleteAccount);
// update profie details
router.put("/updateProfile", auth, updateProfile);
// get all user profile details
router.get("/getUserDetails", auth, getAllUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
// update display picture in profile
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
// Get instructor dashboard api
router.get("/instructorDashboard", auth, isInstructor , instructorDashboard);

module.exports = router;



