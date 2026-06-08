const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new mongoose.Schema(
{
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },

    passwordHash:{
        type:String,
        required:true,
    },

    role:{
        type:String,
        enum:["Admin","Teacher"],
        required:true,
    },

    isVerified:{
        type:Boolean,
        default:false,
    },

    verificationTokenHash:{
        type:String,
        default:null,
    },

    verificationTokenExpiry:{
        type:Date,
        default:null,
    },

    passwordResetTokenHash:{
        type:String,
        default:null,
    },

    passwordResetTokenExpiry:{
        type:Date,
        default:null,
    },

    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        default:null,
    },

    accountStatus:{
        type:String,
        enum:["Active","Suspended","Disabled"],
        default:"Active",
    },

    lastLogin:{
        type:Date,
        default:null,
    },

    profilePhoto:{
        type:String,
        default:"",
    }
},
{
    timestamps:true,
}
);


const User = mongoose.model("User",userSchema);
module.exports = { User, userSchema };