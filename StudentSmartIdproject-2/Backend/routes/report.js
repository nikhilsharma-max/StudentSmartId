const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
const reportController = require("../controllers/report.js");
router.use(authMiddleware);

router.get("/summary",roleMiddleware(["Admin","teacher"]),reportController.getReportSummary);
router.get("/attendance",roleMiddleware(["Admin","teacher"]),reportController.getAttendanceReport);
router.get("/class-summary",roleMiddleware(["Admin","teacher"]),reportController.getClassSummaryReport);

module.exports = router;