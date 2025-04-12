const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const userRouter = require("./routes/authRoutes");
const dashboardRouter = require("./routes/userDashboardRoutes");
const paymentRouter = require("./routes/paymentRoute");
const adminRouter = require("./routes/adminRoutes");
const eventRouter = require("./routes/eventRoutes");
// const checkInRouter = require("./routes/checkInRoutes")

dotenv.config();
console.log("in index - ", process.env.MONGO_ATLAS_URI);
//database url
mongoose
    .connect(process.env.MONGO_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {})
    .catch((err) => {
        console.log(err);
    });

require("./models/otpAuth");
require("./models/user");
require("./models/admin");
require("./models/event");
