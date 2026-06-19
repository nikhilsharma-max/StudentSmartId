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
    "../controllers/notification"
);

router.post(
    "/",roleMiddleware(["Admin","teacher"]),
    createNotification
);

router.get(
    "/",roleMiddleware(["Admin","teacher"]),
    getAllNotifications
);

router.get(
    "/:id",roleMiddleware(["Admin","teacher"]),
    getNotificationById
);

router.delete(
    "/:id",roleMiddleware(["Admin","teacher"]),
    deleteNotification
);

module.exports = router;
