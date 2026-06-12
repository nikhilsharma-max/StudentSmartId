const express = require("express");
const router = express.Router();
const SchoolSettingController = require("../controllers/Schoolsetting.js");
const { schoolSettingsSchema, SchoolSettings } = require("../models/SchoolSetting.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);
router.post("",roleMiddleware(["Admin"]),SchoolSettingController.postSchoolData);
router.get("",roleMiddleware(["Admin","teacher"]),SchoolSettingController.getSchoolData);
router.patch("",roleMiddleware(["Admin"]),SchoolSettingController.updateSchoolData);
router.delete("/:id",roleMiddleware(["Admin"]),SchoolSettingController.deleteSchoolData);

module.exports = router;