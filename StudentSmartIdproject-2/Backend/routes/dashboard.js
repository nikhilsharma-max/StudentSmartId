const express = require("express");
const router = express();
const dashboardController = require("../controllers/dashboard.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);

router.get("/stats",roleMiddleware(["Admin","teacher"]),dashboardController.dashboardStats);
router.get("/weeklystats",roleMiddleware(["Admin","teacher"]),dashboardController.getWeeklyAttendance);
module.exports = router