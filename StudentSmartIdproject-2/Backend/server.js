const express = require("express");
const mongoose = require("mongoose");
const StudentRouter = require("./routes/student.js");
const ClassesRouter = require("./routes/classes.js");
const AttendaceRouter = require("./routes/attendance.js");
const TeacherRouter = require("./routes/teacher.js");
const ActivatingRouter = require("./routes/activitylog.js");
const SchoolSettingRouter = require("./routes/schoolsetting.js");
const userRouter = require("./routes/user.js");
const dashboardRouter = require("./routes/dashboard.js");
const notificationRoutes = require("./routes/notification");
const reportRouter = require("./routes/report.js");
const { User } = require("./models/User.js");
const cookieParser = require('cookie-parser');
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Activating listening port
let port = process.env.PORT;
app.listen(port,()=>{
    console.log("Listening to port 8000");
});

//Mongo connection
const url = process.env.MONGO_URL;
async function main() {
    try {
        //connect to atlas
        await mongoose.connect(url);
        console.log("Connection to database successful")
    } catch (error) {
        console.log(error);
    }   
}
main();


app.get("/ping", (req,res)=>{
    console.log("PING HIT");
    res.send("pong");
});
app.use(cookieParser());
//Creating routes
app.use("/student",StudentRouter);
app.use("/classes",ClassesRouter);
app.use("/attendance",AttendaceRouter);
app.use("/teacher",TeacherRouter);
app.use("/activitylog",ActivatingRouter);
app.use("/schoolsetting",SchoolSettingRouter);
app.use("/auth", userRouter);
app.use("/dashboard",dashboardRouter);
app.use("/notification",notificationRoutes);
app.use("/report",reportRouter);