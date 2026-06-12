const {activityLogSchema,ActivityLog} = require("../models/ActivityLog.js");

module.exports.postActivityLog = async(req,res)=>{
    let data = req.body;
    try {
        if(!data){
            return res.status(404).json({
                success:false,
                message:"No data found",
            })
        }
        let insertedData = await ActivityLog.insertMany(data);
        if(!insertedData){
            return res.status(500).json({
                success:false,
                message:"Cannot add log data",
            })
        }
        return res.status(201).json({
            success:true,
            message:"Logged data added successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.getActivityLog = async(req,res)=>{
    try {
        let data = await ActivityLog.find();
        if(!data){
            return res.status(404).json({
                success:false,
                message:"Cannot get data",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully get data",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}