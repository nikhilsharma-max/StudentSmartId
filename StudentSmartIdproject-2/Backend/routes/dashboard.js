const express = require("express");
const router = express();
const dashboardController = require("../controllers/dashboard.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);

router.get("/stats",roleMiddleware(["Admin","Teacher"]),dashboardController.dashboardStats);
router.get("/weeklystats",roleMiddleware(["Admin","Teacher"]),dashboardController.getWeeklyAttendance);
router.get("/live-activity-table",roleMiddleware(["Admin","Teacher"]),dashboardController.getRecentAttendance);
router.get("/heatmap/:id",roleMiddleware(["Admin","Teacher"]),dashboardController.getAttendanceHeatmap);
module.exports = router