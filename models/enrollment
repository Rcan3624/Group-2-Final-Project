const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    courses: {
        type: String,
        required: true
    }

}, {timestamp: true});

const Enroll = mongoose.model('Enroll', enrollmentSchema)
module.exports = Enroll