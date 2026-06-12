const { SchoolSettings,schoolSettingsSchema} = require("../models/SchoolSetting.js");
const { logActivity } = require("../Services/activityLogger.js");

module.exports.postSchoolData = async(req,res)=>{
    console.log("Request aayi hai")
    let data = req.body;
    try {
        const existingSettings = await SchoolSettings.findOne();
        if(existingSettings){
            return res.status(409).json({
                success:false,
                message:"Data already exists",
            })
        }
        if(!data){
            return res.status(404).json({
                success:false,
                message:"No data to insert",
            })
        }
        let insertedData = await SchoolSettings.insertMany(data);
        if(!insertedData){
            return res.status(400).json({
                success:false,
                message:"Cannot insert data",
            })
        }
        await logActivity(req.user.userId, "CREATE_SCHOOL", "SchoolSettings", insertedData[0]._id, "School record created",null,insertedData);
        return res.status(201).json({
            success:true,
            message:"School added successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.getSchoolData = async(req,res)=>{
    try {

        let data = await SchoolSettings.find();
        if(!data){
            return res.status(404).json({
                success:false,
                message:"No data found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Data found",
            data

        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.updateSchoolData  = async(req,res)=>{
    try {
            let updateData = req.body;
            if(Object.keys(updateData).length === 0){
                return res.status(400).json({
                    success: false,
                    message:"Invalid data"
                })
            }
            // const oldData = await SchoolSettings.findById(id);
            let updatedSchool = await SchoolSettings.findOneAndUpdate({},updateData,{ returnDocument: 'after',runValidators:true});
            if(!updatedSchool){
                return res.status(400).json({
                    success:false,
                    message:"Invalid update data",
                })
            }
            await logActivity(req.user.userId, "UPDATE_SCHOOL", "SchoolSettings", updatedSchool._id, "School record updated", null, updatedSchool);
            return res.status(200).json({
                success:true,
                message:"School updated successfully",
                school: updatedSchool
            })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports.deleteSchoolData = async(req,res)=>{
    let {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id not provided",
            })
        }
        let deletedData = await SchoolSettings.findByIdAndDelete(id);
        if(!deletedData){
            return res.status(404).json({
                success:false,
                message:"Failed to delete",
            })
        }
        await logActivity(req.user.userId, "DELETE_SCHOOL", "SchoolSettings", deletedData._id, "School record deleted",deletedData,null);
        return res.status(200).json({
            success:true,
            message:"Data deleted successfully",
            deletedData,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

