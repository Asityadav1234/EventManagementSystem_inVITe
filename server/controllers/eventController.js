const { Event } = require("../models/event");
const Admin = require("../models/admin");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const nodemailer = require("nodemailer");

function sendCheckInMail(data) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODE_MAILER_USER,
            pass: process.env.NODE_MAILER_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOptions = {
        from: process.env.NODE_MAILER_USER,
        to: data.email,
        subject: `${data.name} You've Checked In - InVITe`,
        html: `Dear ${data.name},<br><br>
           <strong>Congratulations, you've successfully checked in!</strong><br><br>
           Name: ${data.name}<br>
           College ID: ${data.regNo}<br>
           Contact Number: ${data.number}<br><br>`
    };

    transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
            console.log(err);
        } else {
            console.log("Checked In Email sent successfully");
        }
    });
}
