const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    dept: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type:String
    }

}, {timestamp: true});

const Course = mongoose.model('course', courseSchema)
module.exports = Course