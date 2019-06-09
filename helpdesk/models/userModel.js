const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    _id: Number,
    login: String,
    firstname: String,
    lastname: String,
    mail: String,
    created_on: String,
    last_login_on: String
}, {
    timestamps: false
});

module.exports.User = mongoose.model('User', userSchema, 'users');
