// @ts-check



let svcb = require('../services/servicesBD/servicebd.users');
let svc = require('../services/service.users');
exports.fetchAllUsers = async (req, res) => {
    res.json(await svcb.getForce());
};

exports.getUsers = async (req, res) => {
    res.json(await svc.getUsers());
};


exports.createUser = async (req, res) => {

    const user = await svcb.createUser(req)
        .catch((err) => {
            console.log(JSON.stringify(err.message));
        });
};



exports.getUserById = async (req, res) => {

    let enc = await svc.getUserById(req.params.id)
        .catch((err) => {
            res.status(404).send(JSON.stringify(err.message));
        });
    if (enc) res.json(enc);
};


exports.updateUser = async (req, res) => {

    let enc = await svc.updateUser(req.params.id, req.body)
        .catch((err) => {
            res.status(404).send(JSON.stringify(err.message));
        });

    if (enc) {
        res.json({
            message: "Issue atualizada!",
            Atualizada: enc
        });
    }
};


exports.deleteUser = async (req, res) => {

    let enc = await svc.deleteUser(req.params.id)
        .catch((err) => {
            res.status(404).send(JSON.stringify(err.message));
        });

    if (enc) {
        res.json({
            message: 'Issue apagada!',
            Apagada: enc
        });
    }
};

exports.getForce = async (req, res) => {
    res.json(await svcb.getForce());
};