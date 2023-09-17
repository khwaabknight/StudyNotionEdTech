const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require("../utils/mailSender");
require('dotenv').config();
const Profile = require("../models/Profile");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

// sendOtp
exports.sendOtp = async (req,res) => {
    try {
        // fetch email from request body
        const {email} = req.body;

        // check if the email already exists as a user
        const checkUserPresent = await User.findOne({email});

        // if the user already exists ... return "User already present"
        if(checkUserPresent) {
            return res.status(401).send({
                success:false,
                message:"User already registered. Please log in.",
            });
        }

        // generate Otp
        const str = '1234567890';
        var otp = '';
        for(let i=0;i<6;i++){
            var char = Math.floor(Math.random() * str.length);
            otp += str.charAt(char);
        }
        console.log("Otp generated as: ", otp);

        const otpPayload = {email,otp};

        // otp entry creation in DB
        console.log("fine here");
        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody);

        return res.status(200).json({
            success:true,
            message:"Otp created successfully and added into Database using Otp model. ",
            otp,
        });
    } catch (error) {
        // error case
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occured in creating Otp, please try again",
        });
    }
    
}

// signUp
exports.signUp = async (req,res) => {
    try {
        // data fetch from request body
        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp} = req.body;
        // validate data matching , both passwords etc
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success:false,
                message:"Some fields are missing in the signUp form , All fields are mandatory, Please fill all fields.",
            })
        }
        if(password != confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Both passwords provided should match, please try again with same passwords."
            })
        }
        // check if user exists or not
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"User is already registered, please try again with different email account or login with your currently submitted email",
            });
        }
        // find most recent otp storeed for the user
        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
        // validate otp
        if(recentOtp.length == 0){
            // otp not found
            return res.status(400).json({
                success:false,
                message:"Otp not found",
            });
        }else if(otp !== recentOtp[0].otp){
            // Invalid otp case
            return res.status(400).json({
                success:false,
                message:"Invalid Otp",
            });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password,10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);//??? why

        // create entry in db
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
        const user = await User.create({
            firstName,lastName,email,contactNumber,password:hashedPassword,accountType,approved:approved,additionalDetails:profileDetails._id,image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`
        })
        // return res
        return res.status(200).json({
            success:true,
            message:'User is registered successfully',
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. Please try again.",
        })
    }

}

// login
exports.login = async (req,res) => {
    try {
        // get data from req body
        const {email,password} = req.body;
        // validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Some fields are missing in the Login form , All fields are mandatory, Please fill all fields.",
            });
        }
        // user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails").exec();
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered,please sign up first",
            })
        }
        // generate JWT, after password matching
        if(await bcrypt.compare(password,user.password)) {
            const payload = {
                email : user.email,
                id : user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET ,{expiresIn:"15d",});

            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {expires:new Date(Date.now() + 3*24*60*60*1000),httpOnly:true,}
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,user,
                message:"Logged in successfully",
            });
        }else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failed, please try again",
        });
    }
}


// ChangePassword
exports.changePassword = async (req,res) => {
    try {
        

        // get data from req body --> get old pass, new pass, confirm pass
        const {oldPassword,newPassword,newConfirmPassword} = req.body;

        // check whether password matches -- the old passwor and the provided old password
            // Get user data from req.user
            const userDetails = await User.findById(req.user.id);

            console.log(oldPassword,userDetails.password);
            
            // Validate old password
            const isPasswordMatch = await bcrypt.compare(
                oldPassword,
                userDetails.password
            );
            if (!isPasswordMatch) {
                // If old password does not match, return a 401 (Unauthorized) error
                return res
                    .status(401)
                    .json({ success: false, message: "The password is incorrect" });
            }

        // const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        // validation
        if(!oldPassword || !newPassword || !newConfirmPassword){
            return res.status(403).json({
                success:false,
                message:"All fields are required, please try again",
            });
        }

        if(newPassword != newConfirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Both passwords provided should match, please try again with same passwords."
            });
        }

        // const payload = jwt.verify(token,{complete:true});
        // console.log(payload);
        // const email = payload.payload.email;


        // update pwd in DB
        const hashedPassword = await bcrypt.hash(newPassword,10);
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,{password:hashedPassword},{new:true});

        // send mail - pwd updated
        try {
            const emailResponse = await mailSender(updatedUserDetails.email,
            passwordUpdated(updatedUserDetails.email,`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`));
            console.log("Email sent successfully", emailResponse.response);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success:false,
                message:"Error occurred while sending email",
                error:error.message,
            })
        }
        // return response 
        return res.status(200).json({
            success:true,
            message:"Your Password has been changed successfully.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Some error occured while changing the password, please try again.",
            error:error.message,
        });
    }

}