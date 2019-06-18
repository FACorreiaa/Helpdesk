const mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;

let userSchema = new Schema({
    id: Number,
    login: String,
    firstname: String,
    lastname: String,
    mail: String,
    created_on: String,
    last_login_on: String
}, {
    _id: false
});

userSchema.plugin(idvalidator);
module.exports = mongoose.model('User', userSchema);