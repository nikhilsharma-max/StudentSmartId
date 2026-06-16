const express = require("express");
const router = express();
const dashboardController = require("../controllers/dashboard.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);

router.get("/stats",roleMiddleware(["Admin","teacher"]),dashboardController.dashboardStats);
router.get("/weeklystats",roleMiddleware(["Admin","teacher"]),dashboardController.getWeeklyAttendance);
router.get("/live-activity-table",roleMiddleware(["Admin","teacher"]),dashboardController.getRecentAttendance);
router.get("/heatmap/:id",roleMiddleware(["Admin","teacher"]),dashboardController.getAttendanceHeatmap);
module.exports = router