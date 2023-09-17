// import the required modules
const express = require("express");
const router = express.Router();

// import controllers

// Course.js controllers
const {createCourse,updateCourse,getAllCourses,getCourseDetails,getFullCourseDetails,getInstructorCourses,deleteCourse} = require("../controllers/Course");
// Categories.js Controllers
const {showAllCategories,createCategory,categoryPageDetails} = require("../controllers/Categories");
// Section.js Controllers 
const {createSection,updateSection,deleteSection,} = require("../controllers/Section");
// SubSection.js Controllers 
const {createSubSection,updateSubSection,deleteSubSection,} = require("../controllers/SubSection");
// RatingsAndReviews.js Controllers 
const {createRating,getAverageRating,getAllRating,} = require("../controllers/RatingsAndReviews");

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");



/*            Course Routes               */
// Courses can only be created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
// update course
router.post('/updateCourse', auth, isInstructor, updateCourse);
// Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Full Course Details
router.post("/getFullCourseDetails",auth, getFullCourseDetails);
// Get All instructor courses
router.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses);
// Delete a course
router.delete('/deleteInstructorCourse',auth,isInstructor,deleteCourse);


/*             Category Routes            */
// Category can only be created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);


/*         RatingsAndReviews Routes        */
// Ratings can only be given to a course by Student
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router