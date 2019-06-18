// @ts-check

const svcb = require('../services/servicesBD/servicebd.issues');
const svc = require('../services/service.issues');

exports.fetchAllIssues = async (req, res) => {
    res.json(await svcb.getIssueByDate());
};

exports.getAllIssues = async (req, res) => {
    res.json(await svc.getIssues());
};

exports.createIssue = async (req, res) => {
    const issue = await svcb.createIssue(req).catch((err) => {
        //res.status(404).send(JSON.stringify(err.message));
    });
    console.log(issue);

};

exports.getIssueById = async (req, res) => {
    const enc = await svc.getIssueById(req.params.id).catch((err) => {
        res.status(404).send(JSON.stringify(err.message));
    });
    if (enc) res.json(enc);
};

exports.updateIssue = async (req, res) => {
    const enc = await svc.updateIssue(req.params.id, req.body).catch((err) => {
        res.status(404).send(JSON.stringify(err.message));
    });

    if (enc) {
        res.json({
            message: 'Issue atualizada!',
            Atualizada: enc,
        });
    }
};

exports.deleteIssue = async (req, res) => {
    const enc = await svc.deleteIssue(req.params.id).catch((err) => {
        res.status(404).send(JSON.stringify(err.message));
    });

    if (enc) {
        res.json({
            message: 'Issue apagada!',
            Apagada: enc,
        });
    }
};

exports.getIssueByDate = async (req, res) => {
    const enc = await svcb.getIssueByDate(req.params.date).catch((err) => {
        res.status(404).send(JSON.stringify(err.message));
    });
    if (enc) res.json(enc);
};