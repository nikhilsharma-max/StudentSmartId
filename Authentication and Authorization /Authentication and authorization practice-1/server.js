const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./Routes/authrouter.js");
const cookieParser = require("cookie-parser")
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.listen(3000,()=>{
    console.log("Listening to port 3000");
})
mongo_url = "mongodb+srv://yt-auth-server:oKEeBEvWNtnokzK3@yt-auth.e7fjtyh.mongodb.net/?appName=yt-auth";
async function connectDB(){
    try {
        await mongoose.connect(mongo_url);
        console.log("Connected to DB");  
    } catch (error) {
        console.log(error);
    }

}
connectDB();

app.use("/api/auth",authRouter);