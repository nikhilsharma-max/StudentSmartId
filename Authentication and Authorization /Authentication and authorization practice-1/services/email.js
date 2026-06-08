const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: "nikhilsharma745408@gmail.com",
    clientId:"617004464851-qprl52n5fmpj0t3f0mtcvbefp0i80vm1.apps.googleusercontent.com",
    clientSecret:"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",
    refreshToken:"1//04jisyrE4UahVCgYIARAAGAQSNwF-L9IrHJv5NhuhOwO0KFFU6tdhxPXyv5sOO8ePZIdXP5kRXs6avcgzJt3QR-ytwO3r6RGNEtU",
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
