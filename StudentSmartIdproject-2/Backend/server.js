const express = require("express");
const mongoose = require("mongoose");
const StudentRouter = require("./routes/student.js");
const ClassesRouter = require("./routes/classes.js");
const AttendaceRouter = require("./routes/attendance.js");
const TeacherRouter = require("./routes/teacher.js");
const ActivatingRouter = require("./routes/activitylog.js");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Activating listening port
let port = process.env.PORT;
app.listen(port,()=>{
    console.log("Listening to port");
});

//Mongo connection
const url = process.env.MONGO_URL;
async function main() {
    try {
        //connect to atlas
        await mongoose.connect(url);
        console.log("Connected to mongodb atlas")
    } catch (error) {
        console.log(error);
    }   
}
main();


//Creating routes
app.use("/student",StudentRouter);
app.use("/classes",ClassesRouter);
app.use("/attendance",AttendaceRouter);
app.use("/teacher",TeacherRouter);
app.use("/activitylog",ActivatingRouter);




