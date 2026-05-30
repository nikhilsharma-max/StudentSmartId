const mongoose = require("mongoose");
const {Schema} = mongoose;

const studentSchema = new mongoose.Schema(
{
    // =========================
    // Basic Information
    // =========================

    name: {
        type: String,
        required: true, // Bina nam ke kam nhi chalega
        trim: true, // To trim faltu spaces
        maxlength: 150
    },

    rollNumber: {
        type: Number,
        required: true,//Bina roll number ke kam nhi hoga
        min: 1
    },

    admissionNumber: {
        type: String,
        required: true,//must to have
        unique: true,
        trim: true
    },

    profilePhoto: {
        type: String,
        default: "/images/default-profile.png" //default profile picture
    },

    studentCardId: {
        type: String,
        unique: true,
        sparse: true,
        default: null
    },

    // =========================
    // Academic Information
    // =========================

    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        // required: true
    },

    section: {
        type: String,
        required: true,
        trim: true
    },

    session: {
        type: String,
        required: true,
        default: "2026-27"
    },

    admissionDate: {
        type: Date,
        default: Date.now
    },

    // =========================
    // Personal Information
    // =========================

    dateOfBirth: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    bloodGroup: {
        type: String,
        enum: [
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        ],
        default: "O+"
    },

    nationality: {
        type: String,
        default: "Indian"
    },

    aadhaarNumber: {
        type: String,
        default: null
    },

    // =========================
    // Contact Information
    // =========================

    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },

    phone: {
        type: String,
        default: null
    },

    // =========================
    // Address
    // =========================

    address: {
        locality: {
            type: String,
            default: ""
        },

        city: {
            type: String,
            default: ""
        },

        state: {
            type: String,
            default: ""
        },

        country: {
            type: String,
            default: "India"
        },

        pincode: {
            type: String,
            default: ""
        }
    },

    // =========================
    // Parent Information
    // =========================

    parentInfo: {
        fatherName: {
            type: String,
            default: ""
        },

        motherName: {
            type: String,
            default: ""
        },

        fatherPhone: {
            type: String,
            default: ""
        },

        motherPhone: {
            type: String,
            default: ""
        },

        fatherOccupation: {
            type: String,
            default: ""
        },

        motherOccupation: {
            type: String,
            default: ""
        },

        emergencyContact: {
            type: String,
            default: ""
        }
    },

    // =========================
    // Attendance Summary
    // =========================

    presentDays: {
        type: Number,
        default: 0
    },

    absentDays: {
        type: Number,
        default: 0
    },

    lateEntries: {
        type: Number,
        default: 0
    },

    attendancePercentage: {
        type: Number,
        default: 0
    },

    // =========================
    // Status
    // =========================

    status: {
        type: String,
        enum: [
            "Active",
            "Inactive",
            "Passed",
            "Transferred",
            "Suspended"
        ],
        default: "Active"
    }
},
{
    timestamps: true
}
);

const Student = new mongoose.model("Student",studentSchema);
module.exports = {studentSchema,Student}