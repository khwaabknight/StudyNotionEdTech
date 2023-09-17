const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file,folder,height,quality) => {
    const options = {folder};
    if (file.mimetype.startsWith('image/')) {
        options.resource_type = 'image';
    } else if (file.mimetype.startsWith('video/')) {
        options.resource_type = 'video';
    }
    if(height) {
        options.height = height
    }
    if(quality) {
        options.quality = quality
    }

    try {
        return await cloudinary.uploader.upload(file.tempFilePath , options);
    } catch (error) {
        console.log(error);
    }    
}