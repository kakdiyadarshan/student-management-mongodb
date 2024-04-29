const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Types.ObjectId,
        ref: "stundent"
    },
    s1: {
        type: Number,
    },
    s2: {
        type: Number,
    },
    s3: {
        type: Number,
    },
    s4: {
        type: Number,
    },
    s5: {
        type: Number,
    },
    total: {
        type: Number,
    },
    per: {
        type: Number,
    },
    min: {
        type: Number,
    },
    max: {
        type: Number,
    },
    grade: {
        type: String
    },
    result: {
        type: String
    },
})

module.exports = mongoose.model('result', resultSchema)