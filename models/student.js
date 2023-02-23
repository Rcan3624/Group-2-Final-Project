const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true5
    },

}, {timestamp: true});

const Stu = mongoose.model('Student', studentSchema)
module.exports = Stu