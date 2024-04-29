const mongoose = require('mongoose');

const stundentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
        type:Number,
        required:true
    },
    class_id:{
        type: mongoose.Types.ObjectId, 
        ref: "div"
    },
})

module.exports = mongoose.model('stundent',stundentSchema)