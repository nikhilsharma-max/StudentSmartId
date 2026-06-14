const {User, userSchema} = require("../models/User.js");
const crypto = require("crypto");
const { sendEmail } = require("../Services/Email");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {Session} = require("../models/Session.js");
dotenv.config();


module.exports.register = async(req,res)=>{
    
    try {
      
        const {username,password,email,role="Admin"} =req.body;
        if(!username || !password || !email || !role){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const alreadyExist = await User.findOne({
            $or: [
                { username },
                { email }
            ]
        });
        if(alreadyExist){
            return res.status(409).json({
                success:false,
                message:"User already registered",
            })
        }
        const passwordHash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");
        // Generate a unique verification token for email verification
        const verificationToken = crypto
            .randomBytes(32)
            .toString("hex");
            //Hash the verification token before storing it in the database for security
        const verificationTokenHash = crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");
        const verificationTokenExpiry = Date.now() + 10 * 60 * 1000; // Store the hashed verification token and its expiry time in the user document
        // Create user first
        const newuser = await User.create({
            username,
            email,
            role,
            passwordHash,
            verificationTokenHash,
            verificationTokenExpiry
        });
        if(!newuser){
            return res.status(400).json({
                success:false,
                message:"Cannot create user"
            })
        }
        //Send verification email with the original (unhashed) verification token
        const verificationLink = `http://localhost:8080/verify-email?token=${verificationToken}`;
        await sendEmail(email, "Email Verification", `Please click verify to verify your email: <a href="${verificationLink}">Verify Email</a> Link will expire in 10 minutes.`);   
        return res.status(201).json({
            "success": true,
            "message": "Registration successful. Please verify your email.",
            "user": newuser
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.verify = async(req,res)=>{
    console.log("User request aayi hai")
    const token = req.query.token;
    try{
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Verification token is required",
            })
        }
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        const user = await User.findOne({
            verificationTokenHash: tokenHash,
            verificationTokenExpiry: { $gt: Date.now() },
        });
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired verification token",
            })
        }
        user.isVerified = true;
        user.verificationTokenHash = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Email verified successfully",
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.login = async(req,res)=>{
     let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Invalid username or password",
            })
        }
        if(!user.isVerified){
            return res.status(403).json({                     
                success:false,
                message:"Please verify your email before logging in",
            })
        }
        const passwordHash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");
        if(passwordHash !== user.passwordHash){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials",
            })
        }

            // Generate JWT 
            
        //Refresh token generation
        const refreshToken = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            jwtSecretKey,
            { expiresIn: '7d' }
        );
        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const refreshTokenExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        //Session creation
        const session = new Session({
            userId: user._id,
            refreshTokenHash: refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            expiresAt: refreshTokenExpiryDate
        });
        await session.save();
        // Refreshtoken and session dono save hone ke baad response bhejna hai
        //Creating access token
        const accessToken = jwt.sign(
            { userId: user._id,sessionId: session._id, username: user.username,role: user.role },
            jwtSecretKey,
            { expiresIn: '15m' }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure:false, // Set to true in production with HTTPS
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            success:true,
            message:"Login successful",
            token: accessToken,
        
        })
    } catch (error) {
        console.log("Error during login:", error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.refreshRoute = async(req,res)=>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({
                success:false,
                message:"Refresh token not found, please login again",
            })
        }
        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");
        const session = await Session.findOne({refreshTokenHash});
        if(!session || session.expiresAt < Date.now()){
            return res.status(401).json({
                success:false,
                message:"Invalid or expired refresh token, please login again",
            })
        }
        if(session.revoked){
            return res.status(401).json({
                success:false,
                message:"Refresh token has been revoked, please login again",
            })
        }
        const user = await User.findById(session.userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }
        //Creating new access token
        const accessToken = jwt.sign(
            { userId: user._id, sessionId: session._id, username: user.username, role: user.role },
            jwtSecretKey,
            { expiresIn: '15m' }
        );
        return res.status(200).json({
            success:true,
            token: accessToken,
        })
    } catch (error) {
        console.log("Error during token refresh:", error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.logout = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const refreshTokenHash = crypto
                .createHash("sha256")
                .update(refreshToken)
                .digest("hex");
            await Session.findOneAndUpdate(
                { refreshTokenHash },
                {
                    revoked: true,
                    revokedAt: new Date()
                }
            );
            res.clearCookie("refreshToken");
        }
        return res.status(200).json({
            success:true,
            message:"Logged out successfully",
        })
    } catch (error) {
        console.log("Error during logout:", error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.logoutAll = async(req,res)=>{
    try {
        const userId = req.user.userId;
        await Session.updateMany(
            { userId },
            {
                revoked: true,
                revokedAt: new Date()
            }
        );
        res.clearCookie("refreshToken");
        return res.status(200).json({
            success:true,
            message:"Logged out from all devices successfully",
        })
    } catch (error) {
        console.log("Error during logout from all devices:", error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

module.exports.getMe = async(req,res)=>{
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
        if(!decoded){
            return res.status(404).json({
                success:false,
                message:"Cannot find user"
            });
        }
        return res.status(200).json({
            success:true,
            decoded
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Invalid token",
        })
    }
}


