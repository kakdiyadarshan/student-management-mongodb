const mongoose = require('mongoose');

const stdSchema = new mongoose.Schema({
    std:{
        type:Number,
        required:true
    },
    
})

module.exports = mongoose.model('std',stdSchema)