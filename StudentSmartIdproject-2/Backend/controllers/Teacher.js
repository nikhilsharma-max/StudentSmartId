const {teacherSchema,Teacher} = require("../models/Teachers.js");
const { logActivity } = require("../Services/activityLogger.js");
const crypto = require("crypto");
const { User } = require("../models/User");


module.exports.postTeacherData = async (req, res) => {
    try {

        const data = req.body;
        if (!data) {
            return res.status(400).json({
                success: false,
                message: "No data to add"
            });
        }

        const {name,
            email,
            password,
            employeeId,
            phone,gender,designation,
        } = data;

        if (
            !email ||
            !password ||
            !employeeId ||
            !phone || 
            !gender || 
            !designation
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "All fields are required"
            });
        }

        const existingTeacher =
            await Teacher.findOne({
                $or: [
                    { email },
                    { phone }
                ]
            });
        if (existingTeacher) {
            return res.status(409).json({
                success: false,
                message:
                    "Teacher already exists"
            });
        }

        const existingUser =
            await User.findOne({
                $or: [
                    { email },
                    { phone }
                ]
            });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message:
                    "User already exists"
            });
        }

        const passwordHash =
            crypto
                .createHash("sha256")
                .update(password)
                .digest("hex");

        // Create Teacher

        const teacher =
            await Teacher.create({
                name,employeeId,email,phone,gender,designation,
                passwordHash
            });

        // Create User

        const user =
            await User.create({
                username:name,
                email,
                passwordHash,
                role: "Teacher",
                teacherId:
                    teacher._id,
                isVerified: true
            });

        await logActivity(
            req.user.userId,
            "CREATE_TEACHER",
            "Teacher",
            teacher._id,
            "Teacher record created",
            null,
            teacher
        );

        return res.status(201).json({
            success: true,
            message:
                "Teacher created successfully",
            teacher,
            user
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong"
        });

}}

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

module.exports.deleteById = async (req, res) => {

    const { id } = req.params;

    try {

        if (!id) {
            return res.status(400).json({
                success: false,
                message:
                    "Id not provided"
            });
        }

        const deletedTeacher =
            await Teacher.findByIdAndDelete(
                id
            );

        if (!deletedTeacher) {
            return res.status(404).json({
                success: false,
                message:
                    "Teacher not found"
            });
        }

        await User.findOneAndDelete({
            teacherId:
                deletedTeacher._id
        });

        await logActivity(
            req.user.userId,
            "DELETE_TEACHER",
            "Teacher",
            deletedTeacher._id,
            "Teacher record deleted",
            deletedTeacher,
            null
        );

        return res.status(200).json({
            success: true,
            message:
                "Teacher deleted successfully",
            deletedTeacher
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong"
        });

    }
};