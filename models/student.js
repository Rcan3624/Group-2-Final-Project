const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({

    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    courses: {
        type: String,
        required: false
    }

}, {timestamp: true});

const Stu = mongoose.model('Stu', studentSchema)
module.exports = Stu
