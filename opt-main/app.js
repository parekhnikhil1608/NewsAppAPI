const nodemailer = require('nodemailer');
const express = require("express");
const app = express();
require('dotenv').config();
// const generateOTP = require('./otpapp')
const otpGenerator = require('otp-generator');
const { Auth, LoginCredentials } = require("two-step-auth");


// Application configurations
const PORT = 8000;
app.use(express.json());


// const { OTP_LENGTH, OTP_CONFIG } = require('../constants/constants');
const generateOTP = () => {
    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    return OTP;
};

// Application Routing
// app.use("/", require("../routes/router"));

app.listen(PORT, () => {
    console.log("Sever started at PORT", PORT);
});
app.get('/', async (req, res) => {
    const otp = await generateOTP()
    // sendMail(otp)
    
    res.send(otp)
})














const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'marion.hegmann21@ethereal.email',
        pass: 'HF8uZc36NwGNaTX1u7'
    }
});
function sendMail(email , otp){
	var details = {
		from: 'mossie.heaney@ethereal.email', // sender address same as above
		to: email, 					// Receiver's email id
		subject: 'Your demo OTP is ', // Subject of the mail.
		html: '<b>hello</b>'					// Sending OTP 
	};


	transporter.sendMail(details, function (error, data) {
		if(error)
			console.log(error)
		else
			console.log(data);
		});
	}
	
	var email = "nik665716@gmail.com";
	var otp = "123456";
	sendMail(email,otp);

