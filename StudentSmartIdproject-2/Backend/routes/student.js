// This is routing file for /student route

const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.js");

router.get("",studentController.getStudent);



router.get("/:id",(req,res)=>{
    res.send("Id pr request aayi h");
})

module.exports = router;