const mongoose = require('mongoose');

const divSchema = new mongoose.Schema({
    std_id:{
        type: mongoose.Types.ObjectId, 
        ref: "std"
    },
    div:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('div',divSchema)