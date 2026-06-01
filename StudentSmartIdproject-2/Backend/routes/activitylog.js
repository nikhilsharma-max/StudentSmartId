const express = require("express");
const router = express.Router();
const ActivityLogController = require("../controllers/ActivityLog.js");
const { ActivityLog } = require("../models/ActivityLog.js");

router.post("",ActivityLogController.postActivityLog);
router.get("",async(req,res)=>{
    try {
        let data = await ActivityLog.find();
        if(!data){
            return res.status(404).json({
                success:false,
                message:"Cannot get data",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully get data",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
})

module.exports = router;