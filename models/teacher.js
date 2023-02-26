const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
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
    dept_id: {
        type: String,
        required: true
    },


}, {timestamp: true});

const Teach = mongoose.model('Teach', teacherSchema)
module.exports = Teach
