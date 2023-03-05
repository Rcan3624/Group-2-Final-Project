const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
        name: {
        type: String,
        required: true
    },

}, {timestamp: true});

const Dept = mongoose.model('Dept', departmentSchema);
module.exports = Dept 

