const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const cors = require('cors');
const router = express.Router();

router.post("/", async (req, res) => {
  const checkEmail = req.body.email;
  const otp = generateOTP(checkEmail);
  res.json({
    result: 'Success',
    message: 'OTP sent successfully to your email for verification.',
    otp: otp,
  });
});

const generateOTP = (checkEmail) => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  sendEmail(OTP, checkEmail);
  return OTP;
};

function sendEmail(OTP, checkEmail) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nikhil.parekh@spec-india.com",
      pass: "inxexdjujqjdgjav",
    },
  });

  var mailOptions = {
    from: "your-email@gmail.com",
    to: `${checkEmail}`,
    cc: "nikhil.parekh@spec-india.com",
    subject: "Validation OTP",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif;">
          <h1>Hello Dear,</h1>
          <p>We hope this message finds you well.</p>
          <p>Your One-Time Password (OTP) for verification is:</p>
          <h2 style="background-color: #007BFF;width: fit-content; color: #fff; padding: 10px 20px; border-radius: 5px;">${OTP}</h2>
          <p>This OTP is essential to confirm your identity securely.</p>
          <p>Please do not share this OTP with anyone for your safety.</p>
          <p>If you didn't request this OTP, please ignore this message.</p>
          <p>Thank you for choosing our service!</p>
          <p>Best regards,</p>
          <p>- Your Company Name</p>
        </body>
      </html>`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Sent Success");
    }
  });
}

module.exports = router;
