const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    //
    // same is as issue.id
    //

    // _id: {type: mongoose.Schema.Types.ObjectId, auto: true},

    //
    // evaluation date of creation
    //
    requested_on: {
        type: Date,
        default: new Date()
    },

    //
    // client evaluation date
    //
    evaluated_on: {
        type: Date,
        default: null
    },

    //
    // client evaluation score
    //
    // score = 0 => not avaliated 
    // score = 1-5 => avaliated
    score: {
        type: Number,
        default: 0
    },

    //
    // original issue cache info
    //

    subject: String,

    description: String,

    project: {
        id: Number,
        product_name: String,
        client_name: String
    },

    tracker: {
        id: Number,
        name: String
    },

    priority: {
        id: Number,
        name: String
    },

    assigned_to: {
        id: Number,
        name: String,
        email: String
    },

    author: {
        id: Number,
        name: String,
        email: String
    },

    created_on: Date,
    closed_on: Date,

    //
    // computed field = closed_on - created_on
    // 
    response_time: Number
}, {
    timestamps: false
});

module.exports.Issue = mongoose.model('Issue', issueSchema, 'issues');