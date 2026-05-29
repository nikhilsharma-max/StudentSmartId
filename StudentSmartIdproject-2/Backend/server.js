import express from 'express';
import mongoose from 'mongoose';
const app = express();
const { Schema } = mongoose;
let port = 8000;

app.listen(port,()=>{
    console.log("Listening to port");
});


//Mongo connection url
const url = "mongodb+srv://StudentSmartId:Nikhil%40kirti9897@cluster0.rikoemw.mongodb.net/studentSmartIdDB?retryWrites=true&w=majority";
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

const studentSchema = new mongoose.Schema({
    name: String,
    rollNumber:Number,
});

const Student = new mongoose.model("Student",studentSchema);
const student1 = new Student({
    name:"Nikhil Sharma",
    rollNumber:11
})
// await student1.save()

app.get("/",(req,res)=>{
    res.send(`<h1>Kya h kyu bar bar bula rha hai</h1>`);
})

app.get("/student", async (req, res) => {
    try {
        let data = await Student.find();
        
        console.log("received request");
        console.log(data);

        res.json(data);

    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching students");
    }
});