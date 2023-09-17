const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/User");

// auth
exports.auth = async (req,res,next) => {
    try {
        // extract token 
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        // if token missing then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        }

        // verify the token
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log("Token decode in auth middleware : ", decode);
            req.user = decode;
        } catch (error) {
            // verification issue
            return res.status(401).json({
                success:false,
                error:error.message,
                message:"Token is invalid",
            });
        }

        next();


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the jsonwebtoken",
        })
    }
}

// student
exports.isStudent = async (req,res) => {
    try {
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:"This route can be accessed by student only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User cannot be verified as a student, please try again",
        })
    }
}

// Instructor
exports.isInstructor = async (req,res,next) => {
    try {
        if(req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:"This route can be accessed by Instructor only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User cannot be verified as a Instructor, please try again",
        })
    }
}

// Admin
exports.isAdmin = async (req,res,next) => {
    try {
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:"This route can be accessed by Admin only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"User cannot be verified as a Admin, please try again",
        })
    }
}