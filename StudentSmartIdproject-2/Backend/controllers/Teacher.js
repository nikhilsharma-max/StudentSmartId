const {teacherSchema,Teacher} = require("../models/Teachers.js");
const { logActivity } = require("../Services/activityLogger.js");


module.exports.postTeacherData = async(req,res)=>{
    try {
        let data = req.body;
        if(!data){
            return res.status(400).json({
                success:false,
                message:"No data to add"
            })
        }
        let addedData = Teacher.insertMany(data);
        if(!addedData){
            return res.status(400).json({
                success:false,
                message:"Cannot add data",
            })
        }
        await logActivity(req.user.userId, "CREATE_TEACHER", "Teacher", addedData[0]._id, "Teacher record created",null,addedData[0]._id);  
        return res.status(201).json({
            success:true,
            message:"Data added succesfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.getAllTeacher = async(req,res)=>{
    try {
        let teacherData = await Teacher.find();
        if(!teacherData){
            return res.status(404).json({
                success:false,
                message:"No data found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Data found successfully",
            teacherData,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.getTeacherById = async(req,res)=>{
    let {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id not valid"
            })
        }
        let teacherData = await Teacher.findById(id);
        if(!teacherData){
            return res.status(404).json({
                success:false,
                message:"No data found",
            });
        }
        return res.status(200).json({
            success:true,
            message:"Data found successfully",
            teacherData,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.updateTeacherById = async(req,res)=>{
   let {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id not provided",
            })
        }

        try{
            let updateData = req.body;
            if(Object.keys(updateData).length === 0){
                return res.status(400).json({
                    success: false,
                    message:"Invalid data"
                })
            }
            const oldData = await Teacher.findById(id);
            let updatedTeacher = await Teacher.findByIdAndUpdate(id,updateData,{ returnDocument: 'after',runValidators:true});
            if(!updatedTeacher){
                return res.status(400).json({
                    success:false,
                    message:"Invalid update data",
                })
            }
            await logActivity(req.user.userId, "UPDATE_TEACHER", "Teacher", updatedTeacher._id, "Teacher record updated", oldData, updatedTeacher);
            return res.status(200).json({
                success:true,
                message:"Teacher updated successfully",
                teacher: updatedTeacher
            })
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:"Failed to update teacher details"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports.deleteById = async(req,res)=>{
    let {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id not provided",
            })
        }
        let deletedData = await Teacher.findByIdAndDelete(id);
        if(!deletedData){
            return res.status(404).json({
                success:false,
                message:"Data cannot be deleted",
            });
        }
        await logActivity(req.user.userId, "DELETE_TEACHER", "Teacher", deletedData._id, "Teacher record deleted",deletedData,null);
        return res.status(200).json({
            success:true,
            message:"Deleted successfully",
            deletedData
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}