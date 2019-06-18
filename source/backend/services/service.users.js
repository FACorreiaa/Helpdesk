'use strict';

let repo = require('../db/db.users');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getUsers = async () => {
    var all = await repo.getUsers();

    //return mapperEnc.fabricaDTO(all);
    return all;
};

exports.getUserById = async (id) => {

    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID: " + id);
    }

    var ret = await repo.getUserById(id);

    if (!ret)
        throw new Error("User com id: " + id + " não encontrada.");

    return ret;
};

exports.getUserByName = async (name) => {

    var ret = await repo.getUserByName(name);

    if (!ret)
        throw new Error("User com nome: " + name + " não encontrada.");

    return ret;
};

exports.updateUser = async (id, data) => {

    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID: " + id);
    }

    try {
        var updated = await repo.updateUser(id, data);

        if (!updated)
            throw new Error("User com id: " + id + " não encontrada.");

        return updated;
    } catch (e) {
        throw new Error("User invalida: " + e.message);
    }
};


exports.deleteUser = async (id) => {

    // if (!ObjectId.isValid(id)) {
    //     throw new Error("Invalid ID: " + id);
    // }

    var deleted = await repo.deleteUser(id);

    if (!deleted)
        throw new Error("User com id: " + id + " não encontrada.");

    return deleted;
};