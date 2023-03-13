const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/course');
const Schema = mongoose.Schema;

const enrollSchema = new Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },


    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]

}, {timestamp: true});

const Enroll = mongoose.model('enroll', enrollSchema);
module.exports = Enroll