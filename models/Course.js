const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    dept: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    }

}, {timestamp: true});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

