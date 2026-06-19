const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true
    },

    message:{
        type:String,
        required:true,
        trim:true
    },

    audienceType:{
        type:String,
        enum:[
            "All",
            "Students",
            "Teachers",
            "Parents"
        ],
        default:"All"
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    }
},
{
    timestamps:true
}
);

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

module.exports = { Notification };