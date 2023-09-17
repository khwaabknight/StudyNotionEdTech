const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create subsection
exports.createSubSection = async (req,res) => {
    try {
        // fetch data from req body
        const {sectionId,title,description} = req.body;
        // extract file from req.files
        const video = req.files.video;
        
        // validation
        if(!sectionId || !title || !description || !video) { 
            return res.status(404).json({
                success:false,
                messaage:"All fields are required",
            });
        }
        console.log(video)
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        console.log(uploadDetails)
        // create a SubSection
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        // update sectionwith this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{$push:{
            subSection:subSectionDetails._id,
        }},{new:true}).populate('subSection').exec(); // HW : log updated section here , after adding populate query 
        console.log(updatedSection);
        // return response
        return res.status(200).json({
            success:true,
            messaage:"Sub section created successfully",
            data:updatedSection,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        });
    }
}

// update subsection
exports.updateSubSection = async (req,res) => {
    try {
        // fetch data from req body
        const {sectionId,subSectionId,title,description} = req.body;

        // validation
        if(!subSectionId) { 
            return res.status(404).json({
                success:false,
                messaage:"SubSection not found",
            });
        }
        const subSection = await SubSection.findById(subSectionId);
        if(!sectionId) { 
            return res.status(404).json({
                success:false,
                messaage:"Section not found",
            });
        }
        // remove previous file from cloudinary??

        if(title !== undefined) {
            subSection.title = title
        }
        if(description !== undefined) {
            subSection.description = description
        }

        if(req.files && req.files.video !== undefined) {
            // extract file from req.files
            const video = req.files.video;
            // upload video to cloudinary
            const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate('subSection');
        
        // return response
        return res.status(200).json({
            success:true,
            messaage:"Sub section updated successfully",
            data:updatedSection,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        });
    }
}

// delete subsection
exports.deleteSubSection = async (req,res) => {
    try {
        const { subSectionId, sectionId } = req.body
        await Section.findByIdAndUpdate(
          { _id: sectionId },
          {
            $pull: {
              subSection: subSectionId,
            },
          }
        )
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
    
        if (!subSection) {
          return res
            .status(404)
            .json({ success: false, message: "SubSection not found" })
        }
    
        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate(
          "subSection"
        )
    
        return res.json({
          success: true,
          message: "SubSection deleted successfully",
          data: updatedSection,
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while deleting the SubSection",
        })
      }
}

