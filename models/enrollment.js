const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    courses: [{
        type: String,
        required: true
    }]

}, {timestamp: true});

const Enroll = mongoose.model('enroll', enrollmentSchema)
module.exports = Enroll