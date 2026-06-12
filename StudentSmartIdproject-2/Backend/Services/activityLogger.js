const {ActivityLog} = require('../models/ActivityLog');

module.exports.logActivity = async function logActivity(performedBy, action, targetCollection, targetId, description = "", oldData = null,newData = null) {   
    try {
        if (!performedBy || !action || !targetCollection || !targetId) {
            console.warn("Missing required fields for activity logging");
            return;
        }
        const activity = new ActivityLog({
            performedBy,
            action,
            targetCollection,
            targetId,
            description,
            oldData,
            newData
        });
        await activity.save();
    } catch (error) {
        console.error("Error logging activity:", error);
    }
};