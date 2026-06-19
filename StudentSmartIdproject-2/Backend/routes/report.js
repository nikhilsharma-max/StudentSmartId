const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
const reportController = require("../controllers/report.js");
router.use(authMiddleware);

router.get("/summary",roleMiddleware(["Admin","Teacher"]),reportController.getReportSummary);
router.get("/attendance",roleMiddleware(["Admin","Teacher"]),reportController.getAttendanceReport);
router.get("/class-summary",roleMiddleware(["Admin","Teacher"]),reportController.getClassSummaryReport);

module.exports = router;