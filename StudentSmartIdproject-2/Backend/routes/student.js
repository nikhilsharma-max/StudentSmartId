// This is routing file for /student route
const {authMiddleware} = require("../middleware/authMiddleware.js");
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);

router.get("",roleMiddleware(["Admin","teacher"]),studentController.getStudent);
router.get("/:id",roleMiddleware(["Admin","teacher"]),studentController.findStudentById);


router.post("",roleMiddleware(["Admin"]),studentController.postStudent);

router.patch("/:id",roleMiddleware(["Admin"]),studentController.updateStudentById);

router.delete("/:id",roleMiddleware(["Admin"]),studentController.deleteStudentById);

module.exports = router;