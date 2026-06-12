const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/Teacher.js");
const { Teacher } = require("../models/Teachers.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);

router.post("",roleMiddleware(["Admin"]),teacherController.postTeacherData);
router.get("",roleMiddleware(["Admin","teacher"]),teacherController.getAllTeacher);
router.get("/:id",roleMiddleware(["Admin","teacher"]),teacherController.getTeacherById);
router.patch("/:id",roleMiddleware(["Admin"]),teacherController.updateTeacherById);
router.delete("/:id",roleMiddleware(["Admin"]),teacherController.deleteById);

module.exports = router;