const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classes.js");

const { model } = require("mongoose");

router.post("",classesController.postClasses);

module.exports = router;