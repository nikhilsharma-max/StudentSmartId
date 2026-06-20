const mongoose = require("mongoose");
const {Schema} = mongoose;

const activityLogSchema = new mongoose.Schema({

    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },

    action: {
        type: String,
        required: true,
        enum: [
            "CREATE_STUDENT",
            "UPDATE_STUDENT",
            "DELETE_STUDENT",

            "CREATE_CLASS",
            "UPDATE_CLASS",
            "DELETE_CLASS",

            "MARK_ATTENDANCE",
            "UPDATE_ATTENDANCE",
            "DELETE_ATTENDANCE",

            "CREATE_TEACHER",
            "UPDATE_TEACHER",
            "DELETE_TEACHER"
        ]
    },

    targetCollection: {
        type: String,
        required: true,
        enum: [
            "Student",
            "Classes",
            "Attendance",
            "Teacher"
        ]
    },

    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    description: {
        type: String,
        trim: true,
        maxlength: 500
    },

    oldData: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },

    newData: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    }

},
{
    timestamps: true
});
const ActivityLog = mongoose.model("ActivityLog",activityLogSchema);
module.exports = {activityLogSchema,ActivityLog};