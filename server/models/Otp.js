const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const otpSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000,
    },
});

// function to send emails
async function sendVerificationEmail(email,otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", emailTemplate(otp));
        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occured while sending otp verification email",error);
        throw error;
    }
}

otpSchema.pre("save", async function(next) {
    console.log("New document saved to database");
    if(this.isNew){
        console.log("New document created", this.email, this.otp);
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});


module.exports = mongoose.model("Otp", otpSchema);