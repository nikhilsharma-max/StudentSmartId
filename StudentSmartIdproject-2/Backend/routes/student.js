// This is routing file for /student route
const {authMiddleware} = require("../middleware/authMiddleware.js");
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.js");

router.use(authMiddleware);

router.get("",studentController.getStudent);
router.get("/:id",studentController.findStudentById);


router.post("",studentController.postStudent);

router.patch("/:id",studentController.updateStudentById);

router.delete("/:id",studentController.deleteStudentById);

module.exports = router;