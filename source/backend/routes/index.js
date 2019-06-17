var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//Get Dash
router.get('/Dashboard', function(req, res, next) {
  res.render('Dashboard', { title: 'Dashboard'})
});

module.exports = router;
