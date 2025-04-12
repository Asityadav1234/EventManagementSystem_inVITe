const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


require("./models/otpAuth");
require("./models/user");
require("./models/admin");
require("./models/event");
