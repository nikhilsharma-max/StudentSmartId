const mongoose = require("mongoose");

const schoolSettingsSchema =
new mongoose.Schema({

    // Basic School Information

    schoolName: {
        type: String,
        required: true,
        trim: true
    },

    schoolCode: {
        type: String,
        //required: true,
        unique: true,
        trim: true
    },

    schoolEmail: {
        type: String,
        default: ""
    },

    schoolPhone: {
        type: String,
        default: ""
    },

    schoolAddress: {
        type: String,
        default: ""
    },

    principalName: {
        type: String,
        default: ""
    },

    // Academic Session

    currentSession: {
        type: String,
        required: true,
        default: "2026-27"
    },

    // Attendance Configuration

    totalWorkingDays: {
        type: Number,
        default: 220,
        min: 0
    },

    schoolStartTime: {
        type: String,
        default: "08:00"
    },

    schoolEndTime: {
        type: String,
        default: "14:00"
    },

    lateEntryThreshold: {
        type: String,
        default: "08:15"
    },

    attendanceCalculationMethod: {
        type: String,
        enum: [
            "WORKING_DAYS",
            "ATTENDANCE_RECORDS"
        ],
        default: "WORKING_DAYS"
    },

    // Academic Terms

    terms: [
        {
            termName: {
                type: String
            },

            startDate: {
                type: Date
            },

            endDate: {
                type: Date
            }
        }
    ]

},
{
    timestamps: true
});

const SchoolSettings =
mongoose.model(
    "SchoolSettings",
    schoolSettingsSchema
);

module.exports = {
    SchoolSettings,
    schoolSettingsSchema
};