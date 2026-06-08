const userModel = require("../models/user");
const session = require("../models/session.js");
const SECRET = "My_secret_token"
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const { decode } = require("punycode");
const sendEmail = require("../services/email.js");

//fuction to generate OTP
function generateOtp(){
    return Math.floor(100000+Math.random()*900000).toString();
}
function getOtpHtml(otp){
    
}


module.exports.postUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already registered"
            });
        }

        // Hash password
        const hashedPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        // Create user first
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate refresh token
        // const refreshToken = jwt.sign(
        //     {
        //         id: user._id
        //     },
        //     SECRET,
        //     {
        //         expiresIn: "7d"
        //     }
        // );

        // // Hash refresh token before storing
        // const refreshTokenHash = crypto
        //     .createHash("sha256")
        //     .update(refreshToken)
        //     .digest("hex");

        // // Create session
        // const createdSession = await session.create({
        //     userId: user._id,
        //     refreshTokenHash,
        //     ip: req.ip,
        //     userAgent: req.headers["user-agent"]
        // });

        // // Generate access token
        // const accessToken = jwt.sign(
        //     {
        //         id: user._id,
        //         sessionId: createdSession._id
        //     },
        //     SECRET,
        //     {
        //         expiresIn: "15m"
        //     }
        // );

        // // Send refresh token as cookie
        // res.cookie("refreshToken", refreshToken, {
        //     httpOnly: true,
        //     secure: false, // true after HTTPS deployment
        //     sameSite: "strict",
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // });
        await sendEmail(email,)
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                verified:user.verified,
            },
            // accessToken
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

module.exports.getMe = async(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(404).json({
            success:false,
            message:"Token not found",
        })
    }
    const decode = jwt.verify(token,SECRET);
    console.log(decode);
    const user = await userModel.findById(decode.id);
    return res.status(200).json({
        message:"user fetched successfully",
        User:{
            username:user.username,
            email:user.email,
        }
    });
}

module.exports.refreshToken = async(req,res)=>{
    
try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({
            message:"Refreshtoken not found"
        })
    }
    const decoded = jwt.verify(refreshToken,SECRET);
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await session.findOne({
        refreshToken,
        revoked:false,
    })
    if(!session){
        return res.status(401).json({
            message:"Invalid refresh token"
        })
    }
    const accessToken = jwt.sign({
        id:decoded.id
    },
    SECRET,{
        expiresIn:'15m',
    })
    const newRefreshToken = jwt.sign({
        id:decode.id,
    },SECRET,{
        expiresIn:'7d'
    })
    const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).update("hex");
    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();
    res.cookie("refreshToken",newRefreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000//7days
    });
    return res.status(200).json({
        message:"Access token update successfully",
        accessToken,
    })
} catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Something went wrong",
    })
    }
}

module.exports.logout = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token not found"
            });
        }

        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const userSession = await session.findOne({
            refreshTokenHash,
            revoked: false
        });

        if (!userSession) {
            return res.status(404).json({
                success: false,
                message: "Invalid refresh token"
            });
        }

        userSession.revoked = true;

        await userSession.save();

        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }
};

module.exports.logoutAll = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(400).json({
            message:"Refresh token not found",
        })
    }
    const decoded = jwt.verify(refreshToken,SECRET);
    await session.updateMany({
        userId:decoded.id,
        revoked:false,
    },{
        revoked:true,
    })
    res.clearCookie("refreshToken");
    res.status(200).json({
        message:"Logged out from all devices"
    })
}


module.exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const foundUser = await userModel.findOne({ email });

        if (!foundUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const hashedPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        const isPasswordValid =
            hashedPassword === foundUser.password;

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const refreshToken = jwt.sign(
            {
                id: foundUser._id
            },
            SECRET,
            {
                expiresIn: "7d"
            }
        );

        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const createdSession = await session.create({
            userId: foundUser._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        });

        const accessToken = jwt.sign(
            {
                id: foundUser._id,
                sessionId: createdSession._id
            },
            SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // true after deployment with HTTPS
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                username: foundUser.username,
                email: foundUser.email
            },
            accessToken
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }
};

