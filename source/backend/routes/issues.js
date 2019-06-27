const express = require('express');
const router = express.Router();

const { Issue } = require('../models/Issue');

const Joi = require('@hapi/joi');

const schemaQueryParams = Joi.object().keys({
    from: Joi.date(),
    to: Joi.date().when('from', {
        is: Joi.date().required(),
        then: Joi.date().greater(Joi.ref('from')),
    }),
    skip: Joi.number().min(0),
    limit: Joi.number().min(1),
    product_name: Joi.string(),
    collaborator_name: Joi.string()
});

router.get('/', (req, res, next) => {
    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {from, to, limit, skip} = vres.value;

    let match_criteria = [];

    if (from)
        match_criteria.push({ created_on: { $gte: from } });

    if (to)
        match_criteria.push({ created_on: { $lte: to } });

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([{$match: match}]);

    if (skip)
        agg.skip(skip);

    if (limit)
        agg.limit(limit);

    agg.exec().then((results)=>res.send(results)).catch(next);
});


//
// get projects from issues
//
router.get('/projects', (req, res, next) => {
    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {from, to, limit, skip} = vres.value;

    let match_criteria = [];

    if (from)
        match_criteria.push({ created_on: { $gte: from } });

    if (to)
        match_criteria.push({ created_on: { $lte: to } });

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([{$match: match}, {$group: {_id: "$project"}}]);

    if (skip)
        agg.skip(skip);
    
    if (limit)
        agg.limit(limit);

    agg.exec().then((results)=>res.send(results)).catch(next);
});


//
// get colaborators from issues
//
router.get('/collaborators', (req, res, next) => {

    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {from, to, limit, skip} = vres.value;

    let match_criteria = [];

    if (from)
        match_criteria.push({ created_on: { $gte: from } });

    if (to)
        match_criteria.push({ created_on: { $lte: to } });

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([{$match: match}, {$group: {_id: "$assigned_to"}}]);

    if (skip)
        agg.skip(skip);

    if (limit)
        agg.limit(limit);

    agg.exec().then((results)=>res.send(results)).catch(next);
});

//
// INDICATORS
//

router.get('/count', (req, res, next) => {
    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {product_name, collaborator_name, from, to} = vres.value;

    let match_criteria = [];

    if (from)
        match_criteria.push({ created_on: { $gte: from } });

    if (to)
        match_criteria.push({ created_on: { $lte: to } });

    if (product_name)
        match_criteria.push({ 'project.product_name': product_name});
    
    if (collaborator_name)
        match_criteria.push({ 'assigned_to.name': collaborator_name});

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([
        {
            $match: match
        },
        {
            $group: {
                _id : null,
                neval: { $sum: { $cond : [{ $eq : ["$score", 0] }, 1, 0] } },
                total: { $sum: 1}
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);

    agg.exec().then((results)=>res.send(results)).catch(next);
});

router.get('/priority/responseTimeAvg', (req, res, next) => {
    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {product_name, collaborator_name, from, to} = vres.value;

    let match_criteria = [];

    if (from)
        match_criteria.push({ created_on: { $gte: new Date(from) } });

    if (to)
        match_criteria.push({ created_on: { $lte: new Date(to) } });

    if (product_name)
        match_criteria.push({ 'project.product_name': product_name});
    
    if (collaborator_name)
        match_criteria.push({ 'assigned_to.name': collaborator_name});

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([
        {
            $match: match
        },
        {
            $addFields: {
                rtime: { $subtract: ['$closed_on', '$created_on']}
            }
        },
        {
            $group: {
                _id : "$priority",
                avgRTime: { $avg: "$rtime"},
            }
        }
    ]);
    agg.exec().then((results)=>res.send(results)).catch(next);
});

router.get('/scoreAvg', (req, res, next) => {
    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {product_name, collaborator_name, from, to} = vres.value;

    let match_criteria = [{ score: { $ne: 0 } }];

    if (from)
        match_criteria.push({ created_on: { $gte: from } });

    if (to)
        match_criteria.push({ created_on: { $lte: to } });

    if (product_name)
        match_criteria.push({ 'project.product_name': product_name});
    
    if (collaborator_name)
        match_criteria.push({ 'assigned_to.name': collaborator_name});

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([
        {
            $match: match
        },
        {
            $group: {
                _id : null,
                avgScore: { $avg: "$score" },
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    agg.exec().then((results)=>res.send(results)).catch(next);
});

router.get('/scoreStd', (req, res, next) => {
    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {product_name, collaborator_name, from, to} = vres.value;

    let match_criteria = [{ score: { $ne: 0 } }];

    if (from)
        match_criteria.push({ created_on: { $gte: from } });

    if (to)
        match_criteria.push({ created_on: { $lte: to } });

    if (product_name)
        match_criteria.push({ 'project.product_name': product_name});
    
    if (collaborator_name)
        match_criteria.push({ 'assigned_to.name': collaborator_name});

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([
        {
            $match: match
        },
        {
            $group: {
                _id : null,
                stdDevScore: { $stdDevPop: "$score" }
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    agg.exec().then((results)=>res.send(results)).catch(next);
});

router.get('/collaborators/responseTimeAvg', (req, res, next) => {
    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {product_name, from, to, limit} = vres.value;

    let match_criteria = [];

    if (from)
        match_criteria.push({ created_on: { $gte: from } });

    if (to)
        match_criteria.push({ created_on: { $lte: to } });

    if (product_name)
        match_criteria.push({ 'project.product_name': product_name});
    
    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([
        {
            $match: match
        },
        {
            $addFields: {
                rtime: { $subtract: ['$closed_on', '$created_on']}
            }
        },
        {
            $group: {
                _id : '$assigned_to',
                avgRTime: { $avg: "$rtime" }
            }
        },
        {
            $sort: {'avgRTime': 1}
        },
        {
            $limit: limit || 10
        }
    ]);
    agg.exec().then((results)=>res.send(results)).catch(next);
});

router.get('/collaborators/scoreAvg', (req, res, next) => {
    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {product_name, from, to, limit} = vres.value;

    let match_criteria = [{ score: { $ne: 0 } }];

    if (from)
        match_criteria.push({ created_on: { $gte: from } });

    if (to)
        match_criteria.push({ created_on: { $lte: to } });

    if (product_name)
        match_criteria.push({ 'project.product_name': product_name});
    
    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([
        {
            $match: match
        },
        {
            $group: {
                _id : '$assigned_to',
                avgScore: { $avg: "$score" }
            }
        },
        {
            $sort: {'avgScore': -1}
        },
        {
            $limit: limit || 10
        }
    ]);
    agg.exec().then((results)=>res.send(results)).catch(next);
});

router.get('/periodic/count', (req, res, next) => {
    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {from, to, limit, skip} = vres.value;

    let match_criteria = [];

    if (from)
        match_criteria.push({ created_on: { $gte: from } });

    if (to)
        match_criteria.push({ created_on: { $lte: to } });

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([
        {
            $match: match
        },
        {
            $project:
            {
                newDate: {
                    year: { $year: "$created_on" },
                    month: { $month: "$created_on" },
                    day: { $dayOfMonth: "$created_on" }
                }
            }
        },
        {
            $group: {
                _id: '$newDate',
                count: {$sum: 1}
            }
        },
        {
            $sort: {'_id': 1}
        }
    ]);

    if (skip)
        agg.skip(skip);
    
    if (limit)
        agg.limit(limit);
    
    agg.exec().then((results)=>res.send(results)).catch(next);
});

router.get('/periodic/scoreAvg', (req, res, next) => {
    const vres = Joi.validate(req.query, schemaQueryParams);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {from, to, limit, skip} = vres.value;

    let match_criteria = [{ score: { $ne: 0 } }];

    if (from)
        match_criteria.push({ created_on: { $gte: from } });

    if (to)
        match_criteria.push({ created_on: { $lte: to } });

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([
        {
            $match: match
        },
        {
            $project:
            {
                newDate: {
                    year: { $year: "$created_on" },
                    month: { $month: "$created_on" },
                    day: { $dayOfMonth: "$created_on" }
                },
                score: 1
            }
        },
        {
            $group: {
                _id: "$newDate",
                avgScore: { $avg: "$score" }
            }
        },
        {
            $sort: {'_id': 1}
        }
    ]);

    if (skip)
        agg.skip(skip);
    
    if (limit)
        agg.limit(limit);

    agg.exec().then((results)=>res.send(results)).catch(next);
});

const schemaVote = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/,'ObjectId'),
    score: Joi.number().min(1).max(5)
});

router.get('/:id/vote/:score', async function(req, res, next) {
    const vres = Joi.validate(req.params, schemaVote);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    let {id, score} = vres.value;

    let issue = await Issue.findById(id);

    if (issue.score === 0) {
        issue.score = score;
        issue.evaluated_on = new Date();
        
        await issue.save();

        let msg = `<h1>you voted ${score} for issue ${id}</h1>`;
        res.send(msg);    
    } else {
        let msg = `<h1>Allready voted for ${id}</h1>`;
        res.send(msg);    
    }
});

const schemaIssueID = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/,'ObjectId').required()
});

router.get('/:id', (req, res, next) => {
    const vres = Joi.validate(req.params, schemaIssueID);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    const {id} = vres.value;

    Issue.findById(id).then((issue)=>res.send(issue)).catch(next);
});


/*
{
    "_id": "5d0e01510e23c103fb50939a", // {type: mongoose.Schema.Types.ObjectId, auto: true}
    "requested_on": "2019-06-22T10:21:38.890Z", // {type: Date, default: new Date.now()}
    "evaluated_on": "2019-06-22T10:24:03.660Z", // {type: Date, default: null},
    "score": 5, // {type: Number, default: 0}
    "project": {
        "id": 970, // {type: number, required: true}
        "product_name": "NexusDB", // {type: String}
        "client_name": "YRC Worldwide Inc." // {type: String}
    },
    "tracker": {
        "id": 45, // {type: Number, required: true}
        "name": "Report" // {type: String}
    },
    "priority": {
        "id": 5, // {type: Number, required: true}
        "name": "High (1 day)" // {type: String}
    },
    "assigned_to": {
        "id": 5, // {type: Number}
        "name": "João Pires", // {type: String}
        "email": "jpires@jibs.pt" // {type: String}
    },
    "author": {
        "id": 48, // {type: Number}
        "name": "Maria Ribeiro", // {type: String}
        "email": "webprogwork@gmail.com" // {type: String}
    },
    "created_on": "2019-06-13T01:15:11.740Z", // {type: Date}
    "closed_on": "2019-06-22T10:23:18.636Z", // {type: Date}
    "subject": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", // {type: String}
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ...", // {type: String}
}
*/

//
// CREATE
//

const schemaNewIssue = Joi.object().keys({
    requested_on: Joi.date(),
    evaluated_on: Joi.date(),
    score: Joi.number().min(0).max(5),
    project: Joi.object().keys({
        id: Joi.number(),
        product_name: Joi.string(),
        client_name: Joi.string()
    }),
    tracker: Joi.object().keys({
        id: Joi.number(),
        name: Joi.string()
    }),
    priority: Joi.object().keys({
        id: Joi.number(),
        name: Joi.string()
    }),
    assigned_to: Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string().email()
    }),
    author: Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string().email()
    }),
    created_on: Joi.date(),
    closed_on: Joi.date(),
    subject: Joi.string(),
    description: Joi.string()
});

router.post('/', async (req, res, next) => {
    const vres = Joi.validate(req.body, schemaNewIssue);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }

    console.log('***POST***', vres.value);
    const issue = new Issue(vres.value);

    const newIssue = await issue.save();

    res.send(newIssue);
});

//
// PUT
//
router.put('/:id', (req, res, next) => {
    const vres = Joi.validate(req.params, schemaIssueID);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }
    const {id} = vres.value;

    res.send({message: `PUT ${id} not yet implemented`});
});

//
// PATCH
//
router.patch('/:id', (req, res, next) => {
    const vres = Joi.validate(req.params, schemaIssueID);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }
    const {id} = vres.value;

    res.send({message: `PATCH ${id} not yet implemented`});
});

//
// DELETE
//
router.delete('/:id', (req, res, next) => {
    const vres = Joi.validate(req.params, schemaIssueID);

    if (vres.error) {
        res.status(400).send({error: vres.error.message});
        return;
    }
    const {id} = vres.value;

    res.send({message: `DELETE ${id} not yet implemented`});
});

module.exports = router;