const mongoose = require("mongoose");
const {Schema} = mongoose;

const schoolSettingsSchema = new mongoose.Schema({

    schoolName: {
        type: String,
        required: true,
        trim: true
    },

    schoolCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    currentSession: {
        type: String,
        required: true
    },

    totalWorkingDays: {
        type: Number,
        default: 220,
        min: 0
    },

    schoolStartTime: {
        type: String,
        required: true,
        default: "08:00"
    },

    schoolEndTime: {
        type: String,
        required: true,
        default: "14:00"
    },

    lateEntryThreshold: {
        type: String,
        default: "08:15"
    },

    terms: [
        {
            termName: {
                type: String,
                required: true
            },

            startDate: {
                type: Date,
                required: true
            },

            endDate: {
                type: Date,
                required: true
            }
        }
    ],

    attendanceCalculationMethod: {
        type: String,
        enum: [
            "WORKING_DAYS",
            "ATTENDANCE_RECORDS"
        ],
        default: "WORKING_DAYS"
    }

}, {
    timestamps: true
});

let SchoolSettings = mongoose.model(
    "SchoolSettings",
    schoolSettingsSchema
);
module.exports = {SchoolSettings,schoolSettingsSchema}