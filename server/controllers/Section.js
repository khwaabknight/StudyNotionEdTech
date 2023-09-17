const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');

exports.createSection = async (req,res) => {
    try {
        // data fetch
        const {sectionName , courseId} = req.body;
        console.log(req.body)
        // data validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success : false,
                message : "Missing parameters",
            });
        }
        // create Section
        const newSection = await Section.create({sectionName});
        // update course with section Object ID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{$push:{
            courseContent:newSection._id,
        }},{new:true})
        .populate({path:'courseContent',populate:{path:'subSection'}})
        .exec();// use populate to replace sections/sub-sections both in updatedCourseDetails

        // return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create Section, please try again",
            error:error.message,
        });
    }
}

exports.updateSection = async (req,res) => {
    try {
        // data input
        const {sectionName,sectionId,courseId} = req.body
        // data validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success : false,
                message : "Missing inputs",
            });
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        const course = await Course.findById(courseId).populate(
            {
                path:'courseContent',
                populate:{
                    path:'subSection',
                }
            }
        ).exec();
        // return res
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:course,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        });
    }
}

exports.deleteSection = async (req,res) => {
    try {
        
        // fetch data input getId - assuming that we are sending Id in params
        const {sectionId,courseId} = req.body;
        await Course.findByIdAndUpdate(courseId,{
            $pull: {
                courseContent:sectionId,
            },
        })
        
        const section = await Section.findById(sectionId)
        if(!section) {
            return res.status(404).json({
                success: false,
                message: 'Section not found',
            })
        }
        // delete all subsections present in current section
        await SubSection.deleteMany({_id: {$in: section.subSection}})
        // use find by id and del
        await Section.findByIdAndDelete(sectionId);
        // todo : do we need to delete the entry from the course schema ?? -No auto delete
        const course = await Course.findById(courseId).populate(
            {
                path:'courseContent',
                populate: {
                    path:'subSection',
                },
            }).exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            data: course,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message,
        });
    }
}