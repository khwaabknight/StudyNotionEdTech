const cloudinary = require('cloudinary');

exports.deleteImagefromCloudinary = async (file_id) => {
    if(!file_id) return;
    try {
        await cloudinary.uploader.destroy(file_id);
    } catch (error) {
        console.log(error);
    }
}