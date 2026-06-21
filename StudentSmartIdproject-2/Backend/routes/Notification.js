const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);
const {
    createNotification,
    getAllNotifications,
    getNotificationById,
    deleteNotification
} = require(
    "../controllers/Notification.js"
);

router.post(
    "/",roleMiddleware(["Admin","Teacher"]),
    createNotification
);

router.get(
    "/",roleMiddleware(["Admin","Teacher"]),
    getAllNotifications
);

router.get(
    "/:id",roleMiddleware(["Admin","Teacher"]),
    getNotificationById
);

router.delete(
    "/:id",roleMiddleware(["Admin","Teacher"]),
    deleteNotification
);

module.exports = router;
