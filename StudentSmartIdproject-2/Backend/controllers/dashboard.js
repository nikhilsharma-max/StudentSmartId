const {Student} = require("../models/Student.js");
const {Attendance,attendanceSchema} = require("../models/Attendace.js");

module.exports.dashboardStats = async(req,res)=>{
    try {
        const totalStudents = await Student.countDocuments({});
        const totalPresentToday = await Attendance.countDocuments({
            date: new Date(),
            status: "Present"
        });
        const totalLateToday = await Attendance.countDocuments({
            date: new Date(),
            status: "Late"
        });
        const totalAbsentToday = await Attendance.countDocuments({
            date: new Date(),
            status: "Absent"
        });
        return res.status(200).json({
            data:{totalStudents,
                totalPresentToday,
                totalLateToday,
                totalAbsentToday
            }
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports.getWeeklyAttendance = async (req, res) => {
    try {

        const weeklyData = [];

        for (let i = 6; i >= 0; i--) {

            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);

            const startOfDay = new Date(currentDate);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(currentDate);
            endOfDay.setHours(23, 59, 59, 999);

            const presentCount = await Attendance.countDocuments({
                status: "Present",
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            });

            weeklyData.push({
                day: currentDate.toLocaleDateString("en-US", {
                    weekday: "long"
                }),
                present: presentCount
            });
        }

        return res.status(200).json({
            success: true,
            data: weeklyData
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch weekly attendance"
        });
    }
};

module.exports.getRecentAttendance = async(req,res)=>{
    try {

        const recentAttendance = await Attendance.find()
                .populate({
                    path: "studentId",
                    select:"name rollNumber",
                    populate: {
                    path: "classId",
                    select:"className section"
                }
        })
            .sort({ createdAt: -1 })
            .limit(10);

        return res.status(200).json({
            success:true,
            data:recentAttendance
        });

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Failed to fetch recent attendance"
        });

    }
}

module.exports.getAttendanceHeatmap = async (req, res) => {
    try {

        const { id } = req.params;

        const now = new Date();

        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        const startOfMonth = new Date(
            currentYear,
            currentMonth,
            1
        );

        const endOfMonth = new Date(
            currentYear,
            currentMonth + 1,
            0,
            23,
            59,
            59,
            999
        );

        const attendance = await Attendance.find({
            studentId: id,
            date: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        });

        const attendanceMap = {};

        attendance.forEach((record) => {

            const day = new Date(
                record.date
            ).getDate();

            attendanceMap[day] = record.status;
        });

        const totalDays = new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();

        const heatmapData = [];

        for (let day = 1; day <= totalDays; day++) {

            heatmapData.push({
                day,
                status:
                    attendanceMap[day] ||
                    "No Record"
            });
        }

        return res.status(200).json({
            success: true,
            data: heatmapData
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch attendance heatmap"
        });
    }
};