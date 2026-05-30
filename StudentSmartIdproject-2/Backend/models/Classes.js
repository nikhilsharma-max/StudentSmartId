const mongoose = require("mongoose");
const {Schema} = mongoose;

const classSchema = new mongoose.Schema(
{
    className: {
        type: String,
        required: true,
        trim: true,
        enum: [
            "LKG",
            "UKG",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
            "X",
            "XI",
            "XII"
        ]
    },

    section: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        enum: ["A", "B", "C", "D", "E", "F"]
    },

    session: {
        type: String,
        required: true,
        trim: true,
        default: "2026-27"
    },

    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        default: null
    },

    totalStudents: {
        type: Number,
        default: 0,
        min: 0
    },

    classroomNumber: {
        type: String,
        trim: true,
        default: ""
    },

    floor: {
        type: Number,
        default: 0,
        min: 0
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
},
{
    timestamps: true
}
);

classSchema.index(
    {
        className: 1,
        section: 1,
        session: 1
    },
    {
        unique: true
    }
);

const Classes = mongoose.model("Class", classSchema);
module.exports = {Classes,classSchema};