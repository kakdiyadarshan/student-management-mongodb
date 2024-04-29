const std = require('../models/stdModel')

// Add Std

exports.insertstd = async (req, res) => {
    const data = await std.create(req.body);
    res.status(200).json({
        status: 200,
        message: "Standared Added Successfully..!",
        data
    })
}