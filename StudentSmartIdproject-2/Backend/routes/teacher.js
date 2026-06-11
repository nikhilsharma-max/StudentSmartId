const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/Teacher.js");
const { Teacher } = require("../models/Teachers.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");

router.use(authMiddleware);

router.post("",teacherController.postTeacherData);
router.get("",teacherController.getAllTeacher);
router.get("/:id",teacherController.getTeacherById);
router.patch("/:id",teacherController.updateTeacherById);
router.delete("/:id",teacherController.deleteById);

module.exports = router;