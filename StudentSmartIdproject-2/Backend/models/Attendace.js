const mongoose = require("mongoose");
const {Schema} = mongoose;


const attendanceSchema = new mongoose.Schema({

    // Student Reference
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
        index: true
    },

    // Attendance Date
    date: {
        type: Date,
        required: true
    },

    // Present / Absent / Late
    status: {
        type: String,
        enum: ["Present", "Absent", "Late"],
        required: true
    },

    // School Entry Time
    entryTime: {
        type: Date,
        default: null
    },

    // School Exit Time
    exitTime: {
        type: Date,
        default: null
    },

    // Total Minutes Inside School
    totalTimeInSchool: {
        type: Number,
        default: 0
    },

    // Late Arrival Flag
    isLate: {
        type: Boolean,
        default: false
    },

    // Minutes Late
    lateByMinutes: {
        type: Number,
        default: 0
    },

    // Marked By
    markedBy: {
        type: String,
        enum: ["System", "Teacher", "Admin"],
        default: "System"
    },

    // Optional Remark
    remark: {
        type: String,
        trim: true,
        maxlength: 200,
        default: ""
    }

}, {
    timestamps: true
});
attendanceSchema.index(
    { studentId: 1, date: 1 },
    { unique: true }
);

const Attendance = mongoose.model(
    "Attendance",
    attendanceSchema
);

module.exports = {
    Attendance,
    attendanceSchema
};