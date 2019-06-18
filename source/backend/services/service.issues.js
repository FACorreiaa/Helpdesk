let repo = require('../db/db.issues');
const {
    ObjectId,
} = require('mongoose').Types;

exports.getIssues = async () => {
    const all = await repo.getIssues();

    // return mapperEnc.fabricaDTO(all);
    return all;
};




exports.getIssueById = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ID: ${id}`);
    }

    const ret = await repo.getIssueById(id);

    if (!ret) {
        throw new Error(`User com id: ${id} não encontrada.`);
    }

    return ret;
};

exports.updateIssue = async (id, data) => {
    if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ID: ${id}`);
    }

    try {
        const updated = await repo.updateIssue(id, data);

        if (!updated) {
            throw new Error(`User com id: ${id} não encontrada.`);
        }

        return updated;
    } catch (e) {
        throw new Error(`User invalida: ${e.message}`);
    }
};


exports.deleteIssue = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ID: ${id}`);
    }

    const deleted = await repo.deleteIssue(id);

    if (!deleted) {
        throw new Error(`User com id: ${id} não encontrada.`);
    }

    return deleted;
};