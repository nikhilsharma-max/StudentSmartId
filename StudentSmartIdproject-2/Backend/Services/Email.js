const path = require("path");
const { Resend } = require("resend");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, html) {
    try {
        console.log(`Sending email to: ${to}`);

        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html
        });

        console.log("Email sent successfully");
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

module.exports = { sendEmail };
