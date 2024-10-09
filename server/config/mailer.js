import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// require(dotenv).config()

// Load environment variables from .env file
dotenv.config(); 

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  // Gmail SMTP server
  port: 465,               // Port 465 is for SSL
  secure: true,            // Set secure to true for port 465
  auth: {
    user: "neeruali99@gmail.com",  // Your Gmail address
    pass: process.env.MAILCODE     // Use app password stored in .env file
  },
});

// Async function to send mail
export default async function sendmail(to, subject, msg) {
  try {
    let info = await transporter.sendMail({
      from: '"kasb7@company" <neeruali99@gmail.com>',  // Sender address
      to: to,                                         // Receiver address
      subject: subject,                               // Subject line
      html: msg                                       // HTML message content
    });
    
    console.log("Email sent: ", info);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

// Example usage (this should not be in the .env file):
// sendmail('kaunainkasab@gmail.com', 'Testing mail', 'Hi there Kaunain');
