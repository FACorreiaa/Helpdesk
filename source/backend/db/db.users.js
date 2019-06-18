// @ts-check

'use strict';
var mongoose = require('mongoose');
var FetchUsers = mongoose.model('User');
var User = mongoose.model('User');

exports.getUsers = async () => {

    return await FetchUsers.find({})
        .then(result => {
            return result;
        }).catch(err => {
            return null;
        })
};


exports.createUser = async (newUser) => {

    return await User.insertMany(newUser)
        .then(result => {
            return result;
        }).catch(err => {
            throw err;
        })

};

exports.getUserById = async (id) => {

    return await FetchUsers.findById(id)
        .then(result => {
            return result;
        }).catch(err => {
            return null;
        })
};

exports.getUserByName = async (name) => {

    return await FetchUsers.find({
            username: name
        })
        .then(result => {
            return result;
        }).catch(err => {
            return null;
        })
};

exports.updateUser = async (id, updated) => {

    return await FetchUsers.findOneAndUpdate({
            _id: id
        }, updated, {
            new: true
        })
        .then(result => {
            return result;
        }).catch(err => {
            return null;
        })
};


exports.deleteUser = async (id) => {

    return await FetchUsers.findOneAndRemove({
            id: id
        })
        .then(result => {
            return result;
        }).catch(err => {
            return null;
        });
};