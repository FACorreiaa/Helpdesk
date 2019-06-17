const mongoose = require('mongoose');
const config = require('../config');

module.exports.dbConnect = function () {
    // Connecting to the database
    return mongoose.connect(config.url, {
            useNewUrlParser: true
        });
}