var express = require('express');
var router = express.Router();

var stats = require('../controlers/stats');

function handleError(err, req, res, next) {
  console.log('*****ERROR*****');
  console.log(err);
}

//
// global_??
//

router.get('/global_01', function(req, res, next) {
  const d0 = new Date(req.query.d0);
  const d1 = new Date(req.query.d1);

    stats.global_01(d0, d1).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/global_02', function(req, res, next) {
  const d0 = new Date(req.query.d0);
  const d1 = new Date(req.query.d1);

    stats.global_02(d0, d1).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/global_03', function(req, res, next) {
  const d0 = new Date(req.query.d0);
  const d1 = new Date(req.query.d1);

    stats.global_03(d0, d1).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/global_04', function(req, res, next) {
  const d0 = new Date(req.query.d0);
  const d1 = new Date(req.query.d1);

    stats.global_04(d0, d1).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/global_05', function(req, res, next) {
  const d0 = new Date(req.query.d0);
  const d1 = new Date(req.query.d1);

    stats.global_05(d0, d1).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/global_06', function(req, res, next) {
  const d0 = new Date(req.query.d0);
  const d1 = new Date(req.query.d1);

    stats.global_06(d0, d1).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/global_07', function(req, res, next) {
  const d0 = new Date(req.query.d0);
  const d1 = new Date(req.query.d1);

    stats.global_07(d0, d1).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

//
// assigned_to_??
//

router.get('/assigned_to_01', function(req, res, next) {
  const assigned_to_id = Number(req.query.assigned_to_id);

    stats.assigned_to_01(assigned_to_id).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/assigned_to_02', function(req, res, next) {
  const assigned_to_id = Number(req.query.assigned_to_id);

    stats.assigned_to_02(assigned_to_id).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/assigned_to_03', function(req, res, next) {
  const assigned_to_id = Number(req.query.assigned_to_id);

    stats.assigned_to_03(assigned_to_id).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/assigned_to_04', function(req, res, next) {
  const assigned_to_id = Number(req.query.assigned_to_id);

    stats.assigned_to_04(assigned_to_id).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/assigned_to_05', function(req, res, next) {
  const assigned_to_id = Number(req.query.assigned_to_id);

    stats.assigned_to_05(assigned_to_id).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});


//
// 
//
router.get('/product_01', function(req, res, next) {
  const product_name = req.query.product_name;

    stats.product_01(product_name).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/product_02', function(req, res, next) {
  const product_name = req.query.product_name;

    stats.product_02(product_name).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/product_03', function(req, res, next) {
  const product_name = req.query.product_name;

    stats.product_03(product_name).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/product_04', function(req, res, next) {
  const product_name = req.query.product_name;

    stats.product_04(product_name).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/product_05', function(req, res, next) {
  const product_name = req.query.product_name;

    stats.product_05(product_name).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/product_06', function(req, res, next) {
  const product_name = req.query.product_name;

    stats.product_06(product_name).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});

router.get('/product_07', function(req, res, next) {
  const product_name = req.query.product_name;

    stats.product_07(product_name).then((r) => {
      res.json(r);
    }).catch((err) => {
      handleError(err, req, res, next);
    });
});


module.exports = router;
