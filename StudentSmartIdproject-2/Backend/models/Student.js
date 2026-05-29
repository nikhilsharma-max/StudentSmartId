const mongoose = require("mongoose");
const {Schema} = mongoose;

const studentSchema = new mongoose.Schema({
    name: String,
    rollNumber:Number,
});

const Student = new mongoose.model("Student",studentSchema);
module.exports = {studentSchema,Student}