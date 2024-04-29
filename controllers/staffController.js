const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const storage = require('node-persist');
storage.init( /* options ... */);
const staff = require('../models/staffModel')

// Add staff (admin)

exports.insertstaff = async (req, res) => {
    const checkadmin = await storage.getItem('admin');
    console.log("admin",checkadmin)
    if (checkadmin != undefined) {
        var b_pass = await bcrypt.hash(req.body.password, 10);
        req.body.password = b_pass;

        const data = await staff.create(req.body);
        res.status(200).json({
            status: 200,
            message: "staff Registered Successfully..!",
            data
        })
    }
}

// get staff

exports.getstaff = async (req, res) => {
    const checkadmin = await storage.getItem('admin');
    if (checkadmin != undefined) {
        const data = await staff.find().populate("class_id");
        res.status(200).json({
            status: 200,
            message: "staff view Successfully..!",
            data
        })
    }
}

// get single staff

exports.getonestaff = async (req, res) => {
    const checkadmin = await storage.getItem('admin');
    if (checkadmin != undefined) {
        var id = req.params.id
        const data = await staff.findById(id);
        res.status(200).json({
            status: 200,
            message: "staff one view Successfully..!",
            data
        })
    }
}

// update staff

exports.updatestaff = async (req, res) => {
    const checkadmin = await storage.getItem('admin');
    if (checkadmin != undefined) {
        var id = req.params.id
        const data = await staff.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: 200,
            message: "staff update Successfully..!",
            data
        })
    }
}

// delete staff

exports.deletestaff = async (req, res) => {
    const checkadmin = await storage.getItem('admin');
    if (checkadmin != undefined) {
        var id = req.params.id
        const data = await staff.findByIdAndDelete(id);
        res.status(200).json({
            status: 200,
            message: "staff delete Successfully..!",
            data
        })
    }
}
