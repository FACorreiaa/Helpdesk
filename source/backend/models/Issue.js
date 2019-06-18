const mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;

let issueSchema = new Schema({
    id: Number,
    project: {
        id: Number,
        name: String
    },
    tracker: {
        id: Number,
        name: String
    },
    status: {
        id: Number,
        name: String
    },
    priority: {
        id: Number,
        name: String
    },
    author: {
        id: Number,
        name: String
    },
    assigned_to: {
        id: Number,
        name: String
    },
    subject: String,
    description: String,
    start_date: String,
    done_ratio: Number,
    closed_on: String,
    created_on: String,
    updated_on: String
}, {
    _id: false
});

issueSchema.plugin(idvalidator);
module.exports = mongoose.model('Issue', issueSchema);