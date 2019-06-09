const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    _id: Number, // ***
    project: { // ***
        id: Number,
        name: String
    },
    tracker: { // *** 
        id: Number,
        name: String
    },
    status: { // XXX
        id: Number,
        name: String
    },
    priority: { // ***
        id: Number,
        name: String
    },
    author: { // XXX
        id: Number,
        name: String
    },
    assigned_to: { // ***
        id: Number,
        name: String
    },
    subject: String,
    description: String, // XXX
    start_date: String, // XXX
    done_ratio: Number, // XXX
    closed_on: String, // ***
    created_on: String, // ***
    updated_on: String // XXX
}, {
    timestamps: false
});

module.exports.Issue = mongoose.model('Issue', issueSchema, 'issues');
