const { Notification } = require(
    "../models/Notification"
);
module.exports.createNotification =
async(req,res)=>{
    try{

        const {
            title,
            message,
            audienceType
        } = req.body;

        if(
            !title ||
            !message
        ){
            return res.status(400).json({
                success:false,
                message:
                    "Title and message are required"
            });
        }

        const notification =
            await Notification.create({
                title,
                message,
                audienceType,
                createdBy:
                    req.user?.userId || null
            });

        return res.status(201).json({
            success:true,
            message:
                "Notification created successfully",
            data:notification
        });

    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:
                "Failed to create notification"
        });
    }
};

module.exports.getAllNotifications =
async(req,res)=>{
    try{

        const notifications =
            await Notification.find()
            .sort({
                createdAt:-1
            });

        return res.status(200).json({
            success:true,
            data:notifications
        });

    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:
                "Failed to fetch notifications"
        });
    }
};

module.exports.getNotificationById =
async(req,res)=>{
    try{

        const { id } = req.params;

        const notification =
            await Notification.findById(id);

        if(!notification){
            return res.status(404).json({
                success:false,
                message:
                    "Notification not found"
            });
        }

        return res.status(200).json({
            success:true,
            data:notification
        });

    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:
                "Failed to fetch notification"
        });
    }
};

module.exports.deleteNotification =
async(req,res)=>{
    try{

        const { id } = req.params;

        const notification =
            await Notification.findByIdAndDelete(
                id
            );

        if(!notification){
            return res.status(404).json({
                success:false,
                message:
                    "Notification not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:
                "Notification deleted successfully"
        });

    }catch(error){

        console.log(error);

        return res.status(500).json({
            success:false,
            message:
                "Failed to delete notification"
        });
    }
};