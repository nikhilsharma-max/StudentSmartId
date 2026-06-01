const mongoose = require("mongoose");
const {Schema} = mongoose;


const teacherSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    profilePhoto: {
        type: String,
        default: "/images/default-teacher.png"
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    dateOfBirth: {
        type: Date
    },

    bloodGroup: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    address: {
        locality: String,
        city: String,
        state: String,
        country: {
            type: String,
            default: "India"
        },
        pincode: String
    },

    designation: {
        type: String,
        required: true
    },

    subjects: [
        {
            type: String
        }
    ],

    qualification: {
        type: String,
        default: ""
    },

    experienceYears: {
        type: Number,
        default: 0
    },

    joiningDate: {
        type: Date,
        default: Date.now
    },

    assignedClasses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        }
    ],

    username: {
        type: String,
        unique: true,
        sparse: true
    },

    passwordHash: {
        type: String,
        default: null
    },

    role: {
        type: String,
        enum: ["Teacher", "Admin", "Principal"],
        default: "Teacher"
    },

    status: {
        type: String,
        enum: ["Active", "Inactive", "OnLeave"],
        default: "Active"
    },
    rfidAuthorized: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Teacher = new mongoose.model("Teacher",teacherSchema);
module.exports = {teacherSchema,Teacher};