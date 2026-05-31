const {Attendance,attendanceSchema} = require("../models/Attendace.js");

module.exports.postAttendanceData = async(req,res)=>{
    let data = req.body;
    try {
        if(!data){
            return res.status(400).json({
                success:false,
                message:"Invaild data"
            })
        }
        let createdData = Attendance.insertMany(data);
        if(!createdData){
            return res.status(400).json({
                success:false,
                message:"Failed to add data",
            })
        }
        return res.status(201).json({
            success:true,
            message:"Succesfully added attendance data"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
};


module.exports.getAllAttendaceRecord = async(req,res)=>{
    try {
        let attendanceRecord = await Attendance.find();
        if(!attendanceRecord){
            return res.status(404).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Succesfully get data",
            attendanceRecord,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports.getAllAttendaceRecordByStudentId = async(req,res)=>{
    let {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Student not found",
            })
        }
        let attendanceRecord = await Attendance.find({"studentId":id}).populate("studentId");
        if(!attendanceRecord || attendanceRecord.length === 0){
            return res.status(404).json({
                success:false,
                message:"No data found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Attendance record found succesfully",
            attendanceRecord,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports.updateAttendanceById = async(req,res)=>{
    let {id} = req.params;
    let dataToUpdate = req.body;
    try {
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id not valid",
            })
        }
        if(Object.keys(dataToUpdate).length === 0){
            return res.status(400).json({
                success:false,
                message:"Invalid update data",
            })
        }
            let updatedData = await Attendance.findByIdAndUpdate(id,dataToUpdate,{ returnDocument: 'after',runValidators:true});
            if(Object.keys(updatedData).length === 0){
                return res.status(404).json({
                    success:false,
                    message:"Failed to update data"
                })
            }
            return res.status(200).json({
                success:true,
                message:"Updated successfully",
                updatedData
            })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.deleteAttendanceById = async(req,res)=>{
    let {id} = req.params;
try {
        if(!id){
        return res.status(400).json({
            success:false,
            message:"Id not provided"
        })
    }
    let deleteddata = await Attendance.findByIdAndDelete(id);
    if(!deleteddata){
        return res.status(404).json({
            success:false,
            message:"No data found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Data deleted successfully",
        deleteddata
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Some error occured"
    })
}
}