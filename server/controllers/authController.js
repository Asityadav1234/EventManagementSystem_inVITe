const express = require("express");
const app = express();
const OtpAuth = require("../models/otpAuth");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const otpGenerator = require("otp-generator");

const { sendSMS } = require("./smsController");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
console.log("in auth - ", JWT_SECRET);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// route - http://localhost:5000/user/signin
const signIn = async (req, res) => {
    const Email = req.body.email;

    User.find({ email: Email }, async function (err, docs) {
        if (docs.length !== 0) {
            //clearing otp auth table
            try {
                await OtpAuth.deleteMany({ email: Email }, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Users deleted successfully");
                    }
                });
            } catch (e) {
                console.log(e);
            }

            // generate otp for new user
            const OTP = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
            });

            const otp = {
                email: Email,
                otp: OTP,
            };

            sendSMS(Email, otp.otp);

            console.log("Generated otp for signin: ", otp);
            //encrypting the otp and then saving to Otp_table
            const salt = await bcrypt.genSalt(10);
            otp.otp = await bcrypt.hash(otp.otp, salt);

            const newUserLogin = new OtpAuth({
                email: otp.email,
                otp: otp.otp,
            });

            newUserLogin.save((error, success) => {
                if (error) console.log(error);
                else
                    console.log("Saved::otp-temporarily::ready for validation");
            });

            return res.status(200).send({ msg: "Otp sent successfully!" });
        } else {
            return res.status(400).send({
                msg: "This Email ID is not registered. Try Signing Up instead!",
            });
        }
    });
};
