// Controller callback to get sudents from database
const {studentSchema,Student} = require("../models/Student.js");
const { logActivity } = require("../Services/activityLogger.js");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const uploadMiddleware = require("../middleware/uploadMiddleware.js");
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
    if(!students){
        return res.status(400).json({
            success:false,
            message:"Failed to add student",
        })
    }
    
    await logActivity(req.user.userId, "CREATE_STUDENT", "Student", students[0]._id, "Student record created", null, students[0]._id);
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
    await logActivity(req.user.userId, "DELETE_STUDENT", "Student", deletedStudent._id, "Student record deleted",deletedStudent,null);
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
            console.log(updateData);
            if(Object.keys(updateData).length === 0){
                return res.status(400).json({
                    success: false,
                    message:"Invalid data"
                })
            }
            const oldData = await Student.findById(id);
            let updatedStudent = await Student.findByIdAndUpdate(id,updateData,{ returnDocument: 'after',runValidators:true});
            if(!updatedStudent){
                return res.status(400).json({
                    success:false,
                    message:"Invalid update data",
                })
            }
            await logActivity(req.user.userId, "UPDATE_STUDENT", "Student", updatedStudent._id, "Student record updated", oldData, updatedStudent);
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

module.exports.updateStudentPhoto = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Student id required"
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Photo is required"
            });
        }

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
       
console.log(req.file?.buffer?.length);
        const uploadResult = await new Promise(
            
            (resolve, reject) => {

                const uploadStream =
                    cloudinary.uploader.upload_stream(
                        {
                           
                        },
                        (error, result) => {
                                console.log("Cloudinary Error:", error);
    console.log("Cloudinary Result:", result);

                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }

                        }
                    );

                streamifier
                    .createReadStream(req.file.buffer)
                    .pipe(uploadStream);

            }
        );
        const oldData = {
            profilePhoto: student.profilePhoto
        };

        student.profilePhoto =
            uploadResult.secure_url;

        await student.save();

        await logActivity(
            req.user.userId,
            "UPDATE_STUDENT_PHOTO",
            "Student",
            student._id,
            "Student photo updated",
            oldData,
            { profilePhoto: student.profilePhoto }
        );

        return res.status(200).json({
            success: true,
            message: "Photo updated successfully",
            photoUrl: student.profilePhoto
        });

    } catch (error) {


        return res.status(500).json({
            success: false,
            message: "Failed to upload photo"
        });

    }
};

module.exports.getStudentsForAttendance = async(req,res)=>{
    try{

        const {
            className,
            section
        } = req.query;

        let students =
            await Student.find()
            .populate("classId");

        if(className){
            students = students.filter(
                student =>
                    student?.classId?.className ===
                    className
            );
        }

        if(section){
            students = students.filter(
                student =>
                    student?.section ===
                    section
            );
        }

        students.sort((a,b)=>
            a.rollNumber - b.rollNumber
        );

        return res.status(200).json({
            success:true,
            students
        });

    }
    catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Failed to load students"
        });

    }
}