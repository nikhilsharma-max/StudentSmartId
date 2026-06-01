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

module.exports.getSummary = async(req,res)=>{
    let {id} = req.params;
    const { from, to } = req.query;
    try {
        if(from===undefined || to === undefined){
            if(!id){
                return res.status(400).json({
                    success:false,
                    message:"Id not provided"
                })
            }
            let attendanceRecord = await Attendance.find({"studentId":id}).populate("studentId");
            if(!attendanceRecord || attendanceRecord.length === 0){
                return res.status(404).json({
                    success:false,
                    message:"No data found",
                })
            }
            let lateCount = 0;
            let presentCount = 0;
            let absentCount = 0;
            for(let i = 0;i<attendanceRecord.length;i++){
                let currData = attendanceRecord[i];
                if(currData.status==="Late")lateCount++;
                if(currData.status==="Present")presentCount++;
                if(currData.status==="Absent")absentCount++;
            }
            let totalDays = 365;// Fetch from school info 
            return res.status(200).json({
                success:true,
                message:{
                    lateCount,
                    presentCount,
                    absentCount,
                }
            })
        }else{
            if(!id){
                return res.status(400).json({
                    success:false,
                    message:"Id not provided"
                })
            }
            if(from>to){
                return res.status(400).json({
                    success:true,
                    message:"Invalid date range"
                })
            }
            let filter = {
                studentId: id
            };
            if (from && to) {
                filter.date = {
                    $gte: new Date(from),
                    $lte: new Date(to)
                };
            }
            const attendanceRecord = await Attendance.find(filter);
            if(!attendanceRecord || attendanceRecord.length === 0){
                return res.status(404).json({
                    success:false,
                    message:"No data found",
                })
            }
            let lateCount = 0;
            let presentCount = 0;
            let absentCount = 0;
            for(let i = 0;i<attendanceRecord.length;i++){
                let currData = attendanceRecord[i];
                if(currData.status==="Late")lateCount++;
                if(currData.status==="Present")presentCount++;
                if(currData.status==="Absent")absentCount++;
            }
            let totalDays = presentCount+absentCount+lateCount;
            let attendancePercent = +((100*(presentCount+lateCount)/(totalDays)).toFixed(2));
            return res.status(200).json({
                success:true,
                message:{
                    from,
                    to,
                    lateCount,
                    presentCount,
                    absentCount,
                    totalDays,
                    attendancePercent
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}