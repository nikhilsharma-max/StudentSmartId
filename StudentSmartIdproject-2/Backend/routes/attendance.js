const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/Attendance.js");
const { Attendance } = require("../models/Attendace.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);

router.post("",roleMiddleware(["Admin","teacher"]),AttendanceController.postAttendanceData);
router.get("",roleMiddleware(["Admin","teacher"]),AttendanceController.getAllAttendaceRecord);
router.get("/student/:id",roleMiddleware(["Admin","teacher"]),AttendanceController.getAllAttendaceRecordByStudentId);//for Student profile page
router.patch("/:id",roleMiddleware(["Admin","teacher"]),AttendanceController.updateAttendanceById);
router.delete("/:id",roleMiddleware(["Admin"]),AttendanceController.deleteAttendanceById);
router.get("/summary/:id",roleMiddleware(["Admin","teacher"]),AttendanceController.getSummary);


module.exports = router;