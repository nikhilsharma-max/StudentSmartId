// This is routing file for /student route
const {authMiddleware} = require("../middleware/authMiddleware.js");
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);

router.get("",roleMiddleware(["Admin","Teacher"]),studentController.getStudent);
router.get("/:id",roleMiddleware(["Admin","Teacher"]),studentController.findStudentById);


router.post("",roleMiddleware(["Admin","Teacher"]),studentController.postStudent);

router.patch("/:id",roleMiddleware(["Admin","Teacher"]),studentController.updateStudentById);

router.delete("/:id",roleMiddleware(["Admin","Teacher"]),studentController.deleteStudentById);

module.exports = router;