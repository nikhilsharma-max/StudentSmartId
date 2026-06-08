const {User, userSchema} = require("../models/User.js");
const crypto = require("crypto");
const { sendEmail } = require("../Services/Email");


module.exports.register = async(req,res)=>{
    
    try {
      
        const {username,password,email,role} =req.body;
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
        console.log(passwordHash);
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
        const verificationLink = `http://localhost:8000/auth/verify-email?token=${verificationToken}`;
        console.log("Step 11 passes");
        await sendEmail(email, "Email Verification", `Please click verify to verify your email: <a href="${verificationLink}">Verify Email</a> Link will expire in 10 minutes.`);   
        console.log("Step 12 passes");
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