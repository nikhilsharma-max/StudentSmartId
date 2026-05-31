const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/Attendance.js");
const { Attendance } = require("../models/Attendace.js");
console.log("request to attendance");


router.post("",AttendanceController.postAttendanceData);
router.get("",AttendanceController.getAllAttendaceRecord);
router.get("/student/:id",AttendanceController.getAllAttendaceRecordByStudentId);//for Student profile page
router.patch("/:id",AttendanceController.updateAttendanceById);
router.delete("/:id",AttendanceController.deleteAttendanceById);

module.exports = router;