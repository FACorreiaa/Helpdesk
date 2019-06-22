var express = require('express');
var router = express.Router();

var { Issue } = require('../models/Issue');

//
// TEMPORARY
//

router.get('/', (req, res, next) => {
    const {d0, d1} = req.query;

    let match_criteria = [];

    if (d0)
        match_criteria.push({ created_on: { $gte: new Date(d0) } });

    if (d1)
        match_criteria.push({ created_on: { $lte: new Date(d1) } });


    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let pipeline = (req.query.group) ?
        [{$match: match}, {$group: {_id: `$${req.query.group}`}}, {$skip: skip}, {$limit: limit}] :
        [{$match: match}, {$skip: skip}, {$limit: limit}];

        let agg = Issue.aggregate(pipeline);

    /*
    let agg = Issue.aggregate([
        {
            $match: match
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ]);
    */

    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});

//
// get projects from issues
//
router.get('/projects', (req, res, next) => {
    const {d0, d1} = req.query;

    let match_criteria = [];

    if (d0)
        match_criteria.push({ created_on: { $gte: new Date(d0) } });

    if (d1)
        match_criteria.push({ created_on: { $lte: new Date(d1) } });

    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([{$match: match}, {$group: {_id: "$project"}}, {$skip: skip}, {$limit: limit}]);

    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});


//
// get colaborators from issues
//
router.get('/collaborators', (req, res, next) => {
    const {d0, d1} = req.query;

    let match_criteria = [];

    if (d0)
        match_criteria.push({ created_on: { $gte: new Date(d0) } });

    if (d1)
        match_criteria.push({ created_on: { $lte: new Date(d1) } });

    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    let match = match_criteria.length > 0 ? {$and: match_criteria} : {};

    let agg = Issue.aggregate([{$match: match}, {$group: {_id: "$assigned_to"}}, {$skip: skip}, {$limit: limit}]);

    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});

//
// INDICATORS
// /issues/...

router.get('/count', (req, res, next) => {
    let {product_name, collaborator_name} = req.query;

    let d0 = new Date(req.query.d0);
    let d1 = new Date(req.query.d1);

    let match_criteria = [
        { created_on: { $gte: d0 } }, 
        { created_on: { $lte: d1 } }
    ];
    if (product_name) {
        match_criteria.push({ 'project.product_name': product_name});
    }
    if (collaborator_name) {
        match_criteria.push({ 'assigned_to.name': collaborator_name});
    }

    let agg = Issue.aggregate([
        {
            $match: {
                $and: match_criteria
            }
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

    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});

router.get('/priority/responseTimeAvg', (req, res, next) => {
    const {product_name, collaborator_name} = req.query;

    let d0 = new Date(req.query.d0);
    let d1 = new Date(req.query.d1);

    let match_criteria = [
        { created_on: { $gte: d0 } }, 
        { created_on: { $lte: d1 } }
    ];
    if (product_name) {
        match_criteria.push({ 'project.product_name': product_name });
    }
    if (collaborator_name) {
        match_criteria.push({ 'assigned_to.name': collaborator_name });
    }

    let agg = Issue.aggregate([
        {
            $match: {
                $and: match_criteria
            }
        },
        {
            $group: {
                _id : "$priority",
                avgRTime: { $avg: "$response_time" },
            }
        }
    ]);
    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});

router.get('/scoreAvg', (req, res, next) => {
    const {product_name, collaborator_name} = req.query;

    let d0 = new Date(req.query.d0);
    let d1 = new Date(req.query.d1);

    let match_criteria = [
        { created_on: { $gte: d0 } }, 
        { created_on: { $lte: d1 } },
        { score: { $ne: 0} } 
    ];
    if (product_name) {
        match_criteria.push({ 'project.product_name': product_name });
    }
    if (collaborator_name) {
        match_criteria.push({ 'assigned_to.name': collaborator_name });
    }

    let agg = Issue.aggregate([
        {
            $match: {
                $and: match_criteria
            }
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
    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});

router.get('/scoreStd', (req, res, next) => {
    const {product_name, collaborator_name} = req.query;

    let d0 = new Date(req.query.d0);
    let d1 = new Date(req.query.d1);

    let match_criteria = [
        { created_on: { $gte: d0 } }, 
        { created_on: { $lte: d1 } },
        { score: { $ne: 0} } 
    ];
    if (product_name) {
        match_criteria.push({ 'project.product_name': product_name });
    }
    if (collaborator_name) {
        match_criteria.push({ 'assigned_to.name': collaborator_name });
    }

    let agg = Issue.aggregate([
        {
            $match: {
                $and: match_criteria
            }
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
    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});

router.get('/collaborators/responseTimeAvg', (req, res, next) => {
    const {product_name} = req.query;

    let d0 = new Date(req.query.d0);
    let d1 = new Date(req.query.d1);
    
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    let match_criteria = [
        { created_on: { $gte: d0 } }, 
        { created_on: { $lte: d1 } }
    ];
    if (product_name) {
        match_criteria.push({ 'project.product_name': product_name });
    }

    let agg = Issue.aggregate([
        {
            $match: {
                $and: match_criteria
            }
        },
        {
            $group: {
                _id : '$assigned_to',
                avgRTime: { $avg: "$response_time" }
            }
        },
        {
            $sort: {'avgRTime': 1}
        },
        {
            $limit: limit
        }
    ]);
    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});

router.get('/collaborators/scoreAvg', (req, res, next) => {
    const {product_name} = req.query;

    let d0 = new Date(req.query.d0);
    let d1 = new Date(req.query.d1);
    
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    let match_criteria = [
        { created_on: { $gte: d0 } }, 
        { created_on: { $lte: d1 } },
        { score: { $ne: 0} } 
    ];
    if (product_name) {
        match_criteria.push({ 'project.product_name': product_name });
    }

    let agg = Issue.aggregate([
        {
            $match: {
                $and: match_criteria
            }
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
            $limit: limit
        }
    ]);
    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});

router.get('/periodic/count', (req, res, next) => {
    let d0 = new Date(req.query.d0);
    let d1 = new Date(req.query.d1);
    
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    let agg = Issue.aggregate([
        {
            $match: {
                $and: [ 
                    { created_on: { $gte: d0 } }, 
                    { created_on: { $lte: d1 } } 
                ]
            }
        },
        {
            $project:
            {
                newDate: {
                    year: { $year: "$created_on" },
                    month: { $month: "$created_on" },
                    day: { $dayOfMonth: "$created_on" }/*,
                    hour: { $hour: "$created_on" },
                    minutes: { $minute: "$created_on" }*/
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
        },
        {
            $skip: skip
        },
        {
            $limit: limit 
        }
    ]);
    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});

router.get('/periodic/scoreAvg', (req, res, next) => {
    let d0 = new Date(req.query.d0);
    let d1 = new Date(req.query.d1);
    
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    let agg = Issue.aggregate([
        {
            $match: {
                $and: [ 
                    { created_on: { $gte: d0 } }, 
                    { created_on: { $lte: d1 } },
                    { score: { $ne: 0 } }
                ]
            }
        },
        {
            $project:
            {
                newDate: {
                    year: { $year: "$created_on" },
                    month: { $month: "$created_on" },
                    day: { $dayOfMonth: "$created_on" }/*,
                    hour: { $hour: "$created_on" },
                    minutes: { $minute: "$created_on" }*/
                }
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
        },
        {
            $skip: skip
        },
        {
            $limit: limit 
        }
    ]);
    agg.exec().then((results)=>res.send(results)).catch((err)=>res.send({error:err}));
});

router.get('/:id/vote/:score', async function(req, res, next) {
    let issue_id = req.params.id;
    let score = parseInt(req.params.score);

    console.log('*VOTE*', issue_id, score);

    let issue = await Issue.findById(issue_id);

    if (issue.score === 0) {
        issue.score = score;
        issue.evaluated_on = new Date();
        
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