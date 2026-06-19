const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classes.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
const { model } = require("mongoose");
const { Classes } = require("../models/Classes.js");
const {roleMiddleware} = require("../middleware/roleMiddleware.js");
router.use(authMiddleware);

router.post("",roleMiddleware(["Admin"]),classesController.postClasses);
router.get("",roleMiddleware(["Admin","Teacher"]),classesController.getClasses);
router.get("/overview",roleMiddleware(["Admin","Teacher"]),classesController.getClassesOverview)
router.get("/:id",roleMiddleware(["Admin","Teacher"]),classesController.getClassById);
router.patch("/:id",roleMiddleware(["Admin"]),classesController.updateClassById);
router.delete("/:id",roleMiddleware(["Admin"]),classesController.deleteClassById);



module.exports = router;