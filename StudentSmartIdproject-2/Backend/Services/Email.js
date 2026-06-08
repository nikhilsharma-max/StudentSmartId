const nodemailer = require('nodemailer');
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,   
    auth: {
        user: process.env.HOST,
        pass: process.env.APP_PASSWORD
    }
});

async function sendEmail(to, subject, text){
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