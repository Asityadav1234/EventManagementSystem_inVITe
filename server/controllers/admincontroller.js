const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const setAdmin = async (req, res) => {
    const secret = JWT_SECRET;
    const payload = {
        email: req.body.email,
    };

    const token = await jwt.sign(payload, secret);

    const new_admin = new Admin({
        admin_id: token,
        email: req.body.email,
        name: req.body.name,
        pass: req.body.password,
    });

    await new_admin.save((error, success) => {
        if (error) console.log(error);
        else console.log("Saved::New Admin::credentials.");
    });

    res.status(200).send({ msg: "Credentials Added" });
};


require("./models/otpAuth");
require("./models/user");
require("./models/admin");
require("./models/event");
