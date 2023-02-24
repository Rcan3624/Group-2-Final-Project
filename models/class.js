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

}, {timestamp: true});

const Course = mongoose.model('Class', courseSchema)
module.exports = Course