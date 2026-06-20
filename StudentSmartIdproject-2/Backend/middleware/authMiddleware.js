const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { Session } = require("../models/Session.js");
dotenv.config();

module.exports.authMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success:false,
            message:"Unauthorized",
        })
    }
    // console.log("Auth header received:", authHeader); // Debugging log
    const token = authHeader.split(" ")[1];
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Optionally, I can also check if the session is valid here
        const session = await Session.findById(decoded.sessionId);
        if(!session || session.expiresAt < Date.now() || session.revoked){
            return res.status(401).json({
                success:false,
                message:"Session is invalid or has expired",
            })
        }
        req.user = decoded;
        // console.log("User attached to request:", req.user); // Debugging log
        return next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Invalid token",
        })
    }
}