const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({

    name: {
        type: String,
        required: true
    },

}, {timestamp: true});

const Dept = mongoose.model('Department', departmentSchema)
module.exports = Dept 