var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const {Issue} = require('../models/Issue');

router.get('/:id/:score', async function(req, res, next) {
    let issue_id = req.params.id;
    let score = parseInt(req.params.score);

    console.log('*VOTE*', issue_id, score);

    let issue = await Issue.findById(issue_id);

    if (issue.score === 0) {
        issue.score = score;
        
        await issue.save();

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
