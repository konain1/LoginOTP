import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  // Gmail SMTP server
  port: 465,               // Port 465 is for SSL
  secure: true,            // Set secure to true for port 465
  auth: {
    user: "neeruali99@gmail.com",  // Your Gmail address
    pass: "mnnhseehoouqpyiv",      // Your generated app password
  },
});

// Async function to send mail
export default async function sendmail(to, subject, msg) {
  try {
    let info = await transporter.sendMail({
      from: '"kasb7@company" <neeruali99@gmail.com>',  // Sender address
      to: to,                                      // Receiver address
      subject: subject,                            // Subject line
      html: msg                                    // HTML message content
    });
    
    console.log("Email sent: ", info);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

// Send test email
