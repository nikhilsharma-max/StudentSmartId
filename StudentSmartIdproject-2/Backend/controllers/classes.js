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

module.exports.getClasses = async(req,res)=>{
    try {
        let classes = await Classes.find();
        if(!classes){
            return res.status(404).json({
                success:false,
                message:"Failed to load class data"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Class data was loaded",
            classes
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


module.exports.getClassById = async(req,res)=>{
    let {id} = req.params;
    try {
        if(!id){
            return res.status(404).json({
                success:false,
                message:"Id not found"
            })
        }
        const requiredClass = await Classes.findById(id);
        if(!requiredClass){
            return res.status(404).json({
                success:false,
                message:"Cannot find class details",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Accessed class succesfully",
            requiredClass,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}


module.exports.updateClassById = async(req,res)=>{
    let {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id not provided",
            })
        }

        try{
            let updateData = req.body;
            if(Object.keys(updateData).length === 0){
                return res.status(400).json({
                    success: false,
                    message:"Invalid data"
                })
            }
            let updatedClass = await Classes.findByIdAndUpdate(id,updateData,{ returnDocument: 'after',runValidators:true});
            if(!updatedClass){
                return res.status(400).json({
                    success:false,
                    message:"Invalid update data",
                })
            }
            return res.status(200).json({
                success:true,
                message:"Class updated successfully",
                class: updatedClass
            })
        }catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:"Failed to update class details"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports.deleteClassById = async(req,res)=>{
    let {id} = req.params;
    try {
        if(!id){
            return res.status(404).json({
                success:false,
                message:"Id not valid",
            })
        }
        let deletedClass = await Classes.findByIdAndDelete(id);
        if(!deletedClass){
            return res.status(404).json({
                success:false,
                message:"Class not found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Class deleted successfully",
            deletedClass,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
};