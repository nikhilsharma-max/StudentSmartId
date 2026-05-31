// Controller callback to get sudents from database
const {studentSchema,Student} = require("../models/Student.js");

module.exports.getStudent = async (req, res) => {
    try {
        let data = await Student.find().populate("classId");
        if(!data){
            return res.status(404).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Sucessfully get student data",
            data,
        })
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching students");
    }
}

module.exports.postStudent = async (req,res)=>{
    let data = req.body;
    console.log(data);
try {
    const students = await Student.insertMany(data);
    res.status(201).json({
        success: true,
        students
    });
}
catch(err){
    console.log(err);
    res.status(500).json({
        success:false,
        message: err.message
    });
}  
}


module.exports.findStudentById = async(req,res)=>{
    let {id} = req.params;
    try {
        if(!id){
            return res.status(500).json({
                success:false,
                message:"Id not get"
            })
        }
        const student = await Student.findById(id).populate("classId");
        if(!student){
            return res.status(500).json({
                success:false,
                message:"No student found"
            })
        }
        return res.status(200).json({
            success:true,
            student
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Some error occured"
        })
    }
}

module.exports.deleteStudentById = async(req,res)=>{
    let {id} = req.params;
try {
        if(!id){
        return res.status(400).json({
            success:false,
            message:"Id not provided"
        })
    }
    let deletedStudent = await Student.findByIdAndDelete(id).populate("classId");
    if(!deletedStudent){
        return res.status(404).json({
            success:false,
            message:"No student found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Student deleted successfully"
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Some error occured"
    })
}
}


module.exports.updateStudentById = async(req,res)=>{
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
            let updatedStudent = await Student.findByIdAndUpdate(id,updateData,{ returnDocument: 'after',runValidators:true});
            if(!updatedStudent){
                return res.status(400).json({
                    success:false,
                    message:"Invalid update data",
                })
            }
            return res.status(200).json({
                success:true,
                message:"Student updated successfully",
                student: updatedStudent
            })
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:"Failed to update student details"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

