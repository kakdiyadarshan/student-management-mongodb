const div = require('../models/divModel')

// Add Div

exports.insertstd = async (req, res) => {
    const data = await div.create(req.body);
    res.status(200).json({
        status: 200,
        message: "Divison Added Successfully..!",
        data
    })
}