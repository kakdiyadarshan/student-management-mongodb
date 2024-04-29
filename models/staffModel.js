const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    class_id:{
        type: mongoose.Types.ObjectId, 
        ref: "div"
    },
})

module.exports = mongoose.model('staff',staffSchema)