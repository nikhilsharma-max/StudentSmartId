// Controller callback to get sudents from database
const {studentSchema,Student} = require("../models/Student.js");

module.exports.getStudent = async (req, res) => {
    try {
        let data = await Student.find();
        
        console.log("received request");
        console.log(data);

        res.json(data);

    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching students");
    }
}