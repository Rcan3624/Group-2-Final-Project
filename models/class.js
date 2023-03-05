const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },

    dept: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

});

const Course = mongoose.model('Course', courseSchema)
module.exports = Course;