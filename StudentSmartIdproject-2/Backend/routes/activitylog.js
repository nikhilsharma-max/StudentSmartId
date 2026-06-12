const express = require("express");
const router = express.Router();
const ActivityLogController = require("../controllers/ActivityLog.js");
const { ActivityLog } = require("../models/ActivityLog.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
router.use(authMiddleware);
const { roleMiddleware } = require("../middleware/roleMiddleware.js");

router.post("",roleMiddleware(["Admin"]),ActivityLogController.postActivityLog);
router.get("",roleMiddleware(["Admin"]),ActivityLogController.getActivityLog);

module.exports = router;