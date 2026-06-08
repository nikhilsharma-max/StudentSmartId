const mongoose = require("mongoose");
const {Schema} = mongoose;
const sessionSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    refreshTokenHash:{
        type:String,
        required:true,
    },

    revoked:{
        type:Boolean,
        default:false,
    },

    revokedAt:{
        type:Date,
        default:null,
    },

    ip:{
        type:String,
        default:"",
    },

    userAgent:{
        type:String,
        default:"",
    },

    loginMethod:{
        type:String,
        enum:["Password"],
        default:"Password",
    },

    expiresAt:{
        type:Date,
        required:true,
    }
},
{
    timestamps:true,
}
);

const Session = mongoose.model("Session",sessionSchema);

module.exports = { Session, sessionSchema };