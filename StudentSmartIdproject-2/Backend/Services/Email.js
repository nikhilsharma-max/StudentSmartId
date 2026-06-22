const nodemailer = require('nodemailer');
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,   
//     auth: {
//         user: process.env.HOST,
//         pass: process.env.APP_PASSWORD
//     }
// });
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4, // force IPv4
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
    }
});
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Verify Error:", error);
    } else {
        console.log("SMTP Server Ready");
    }
});
async function sendEmail(to, subject, text){
    console.log("Sending email to:", to);
    const mailOptions = {
        from: process.env.HOST,
        to,
        subject,
        html: `<p>${text}</p>`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};  

module.exports = { sendEmail };