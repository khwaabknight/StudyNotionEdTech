const cloudinary = require("cloudinary").v2;  // Cloudinary import

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        });
        console.log("coudinary connected");
    } catch (error) {
        console.log(error);
    }
}