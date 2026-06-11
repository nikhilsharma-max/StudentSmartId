const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classes.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");
const { model } = require("mongoose");
const { Classes } = require("../models/Classes.js");

router.use(authMiddleware);

router.post("",classesController.postClasses);
router.get("",classesController.getClasses);
router.get("/:id",classesController.getClassById);
router.patch("/:id",classesController.updateClassById);
router.delete("/:id",classesController.deleteClassById);


module.exports = router;