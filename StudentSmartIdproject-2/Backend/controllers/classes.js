const {Classes,classSchema} = require("../models/Classes.js");
const { logActivity } = require("../Services/activityLogger.js");
const { Student } = require("../models/Student");

module.exports.postClasses = async(req,res)=>{
    let data = req.body;
    try {
        const classes = await Classes.insertMany(data);
        if(!classes){
            return res.status(400).json({
                success:false,
                message:"Failed to add classes",
            })
        }
        await logActivity(req.user.userId, "CREATE_CLASS", "Classes", classes[0]._id, "Class record created",null,Classes);
        return res.status(201).json({
            success:true,
            message:"Added data succesfully",
        })
    } catch (error) {
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
 const classOrder = {
            "LKG": 1,
            "UKG": 2,
            "I": 3,
            "II": 4,
            "III": 5,
            "IV": 6,
            "V": 7,
            "VI": 8,
            "VII": 9,
            "VIII": 10,
            "IX": 11,
            "X": 12,
            "XI": 13,
            "XII": 14
        };

        classes.sort((a,b)=>{

            const classDiff =
                classOrder[a.className] -
                classOrder[b.className];

            if(classDiff !== 0){
                return classDiff;
            }

            return a.section.localeCompare(
                b.section
            );
        });

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
            const oldData = await Classes.findById(id);
            let updatedClass = await Classes.findByIdAndUpdate(id,updateData,{ returnDocument: 'after',runValidators:true});
            if(!updatedClass){
                return res.status(400).json({
                    success:false,
                    message:"Invalid update data",
                })
            }
            await logActivity(req.user.userId, "UPDATE_CLASS", "Classes", updatedClass._id, "Class record updated", null, updatedClass);
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

        const oldData = await Classes.find({_id:id});
        let deletedClass = await Classes.findByIdAndDelete(id);


        if(!deletedClass){
            return res.status(404).json({
                success:false,
                message:"Class not found",
            })
        }
        await logActivity(req.user.userId, "DELETE_CLASS", "Classes", deletedClass._id, "Class record deleted",oldData,null);   
        return res.status(200).json({
            success:true,
            message:"Class deleted successfully",
            deletedClass,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
};

module.exports.getClassesOverview = async (req, res) => {
  try {

    const classes = await Classes.find({})
      .sort({ className: 1, section: 1 });

    const overviewMap = {};

    for (const cls of classes) {

      const studentCount = await Student.countDocuments({
        classId: cls._id
      });

      if (!overviewMap[cls.className]) {
        overviewMap[cls.className] = {
          className: cls.className,
          totalSections: 0,
          totalStudents: 0,
          sections: []
        };
      }

      overviewMap[cls.className].totalSections += 1;

      overviewMap[cls.className].totalStudents += studentCount;

      overviewMap[cls.className].sections.push({
        section: cls.section,
        totalStudents: studentCount,
        session: cls.session,
        status: cls.status
      });
    }

    return res.status(200).json({
      success: true,
      data: Object.values(overviewMap)
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch classes overview"
    });
  }
};