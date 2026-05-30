const {Classes,classSchema} = require("../models/Classes.js");


module.exports.postClasses = async(req,res)=>{
    let data = req.body;
    console.log(data);
    try {
        const classes = await Classes.insertMany(data);
        if(!classes){
            return res.status(400).json({
                success:false,
                message:"Failed to add classes",
            })
        }
        return res.status(201).json({
            success:true,
            message:"Added data succesfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}