const express = require("express");
const router = express.Router();
const SchoolSettingController = require("../controllers/Schoolsetting.js");
const { schoolSettingsSchema, SchoolSettings } = require("../models/SchoolSetting.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");

router.use(authMiddleware);
router.post("",SchoolSettingController.postSchoolData);
router.get("",SchoolSettingController.getSchoolData);
router.patch("",SchoolSettingController.updateSchoolData);
router.delete("/:id",SchoolSettingController.deleteSchoolData);

module.exports = router;