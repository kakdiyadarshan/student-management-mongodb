const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const school = require('../models/schoolModel')
const storage = require('node-persist');
storage.init( /* options ... */ );

// Register school

exports.insertschool = async (req, res) => {
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;

    const data = await school.create(req.body);
    res.status(200).json({
        status: 200,
        message: "School Registered Successfully..!",
        data
    })
}

// Login school

exports.login = async (req, res) => {
    const data = await school.find({ email: req.body.email })
    if (data.length == 1) {
        bcrypt.compare(req.body.password, data[0].password, async (error, result) => {
            if (result == true) {
                await storage.setItem("admin", true);
                var token = jwt.sign({id:data[0].id},"token_key")
                res.status(200).json({
                    status: 200,
                    message: "Login Successfully..!",
                    token
                })
            }
            else {
                res.status(201).json({
                    status: 201,
                    message: "check Email & Password"
                })
            }
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "check Email & Password"
        })
    }
}

exports.adminlogout = async(req,res) => {
    await storage.clear();
    res.status(200).json({
        status: 200,
        message: "Logout Admin Successfully..!"
    })
}