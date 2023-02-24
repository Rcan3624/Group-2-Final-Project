const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

}, {timestamp: true});

const Teach = mongoose.model('Teacher', teacherSchema)
module.exports = Teach
