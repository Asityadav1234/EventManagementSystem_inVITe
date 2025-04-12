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
