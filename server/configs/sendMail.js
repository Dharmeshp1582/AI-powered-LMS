import { createTransport } from "nodemailer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (to,otp) => {
   await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: to,
    subject: "Reset your Password",
    html: `<p>Your OTP for password reset is: <b>${otp}</b>. 
    It expires in 5 minutes.<p/>`, // HTML body
  });
}

export default sendMail