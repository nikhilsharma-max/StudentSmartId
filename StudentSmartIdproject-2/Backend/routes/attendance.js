const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/Attendance.js");
const { Attendance } = require("../models/Attendace.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
router.use(authMiddleware);

router.post("",AttendanceController.postAttendanceData);
router.get("",AttendanceController.getAllAttendaceRecord);
router.get("/student/:id",AttendanceController.getAllAttendaceRecordByStudentId);//for Student profile page
router.patch("/:id",AttendanceController.updateAttendanceById);
router.delete("/:id",AttendanceController.deleteAttendanceById);
router.get("/summary/:id",AttendanceController.getSummary);


module.exports = router;