var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const {Evaluation} = require('../models/evaluationModel');

/* GET home page. */
router.get('/:id/:score', async function(req, res, next) {
    let issue_id = Number(req.params.id);
    let score = Number(req.params.score);

    let evaluation = await Evaluation.findById(issue_id);

    if (evaluation.score === 0) {
        evaluation.score = score;
        
        await evaluation.save();

        let msg = `<h1>you voted ${score} for issue ${issue_id}</h1>`;
        console.log(msg);
        res.send(msg);    
    } else {
        let msg = `<h1>Allready voted for ${issue_id}</h1>`;
        console.log(msg);
        res.send(msg);    
    }
});

module.exports = router;
