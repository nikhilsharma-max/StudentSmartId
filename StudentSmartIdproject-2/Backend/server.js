const express = require("express");
const mongoose = require("mongoose");
const StudentRouter = require("./routes/student.js");
const ClassesRouter = require("./routes/classes.js");
const {studentSchema,Student} = require("./models/Student.js");
require("dotenv").config();
const app = express();
const { Schema } = mongoose;
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

// const student1 = new Student({
//     name:"Nikhil Sharma",
//     rollNumber:11
// })
// await student1.save()





