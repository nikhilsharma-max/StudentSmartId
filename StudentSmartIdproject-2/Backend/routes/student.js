// This is routing file for /student route
const {authMiddleware} = require("../middleware/authMiddleware.js");
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");
router.use(authMiddleware);

router.get("",roleMiddleware(["Admin","Teacher"]),studentController.getStudent);
router.patch(
    "/:id/photo",
    roleMiddleware(["Admin","Teacher"]),
    upload.single("photo"),
    studentController.updateStudentPhoto
);
router.get(
    "/attendance-list",
    roleMiddleware(
        ["Admin","Teacher"]
    ),
    studentController
        .getStudentsForAttendance
);
router.get("/:id",roleMiddleware(["Admin","Teacher"]),studentController.findStudentById);


router.post("",roleMiddleware(["Admin","Teacher"]),studentController.postStudent);

router.patch("/:id",roleMiddleware(["Admin","Teacher"]),studentController.updateStudentById);

router.delete("/:id",roleMiddleware(["Admin","Teacher"]),studentController.deleteStudentById);

module.exports = router;