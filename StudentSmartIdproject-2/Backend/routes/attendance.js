const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/Attendance.js");
const { Attendance } = require("../models/Attendace.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);

router.post("",roleMiddleware(["Admin","Teacher"]),AttendanceController.postAttendanceData);
router.get("",roleMiddleware(["Admin","Teacher"]),AttendanceController.getAllAttendaceRecord);
router.get("/student/:id",roleMiddleware(["Admin","Teacher"]),AttendanceController.getAllAttendaceRecordByStudentId);//for Student profile page
router.patch("/:id",roleMiddleware(["Admin","Teacher"]),AttendanceController.updateAttendanceById);
router.delete("/:id",roleMiddleware(["Admin","Teacher"]),AttendanceController.deleteAttendanceById);
router.get("/summary/:id",roleMiddleware(["Admin","Teacher"]),AttendanceController.getSummary);
router.get("/date/:date",roleMiddleware(["Admin","Teacher"]),AttendanceController.getAttendanceByDate);
router.put("/update-attendance",roleMiddleware(["Admin","Teacher"]),AttendanceController.updateAttendance);

module.exports = router;