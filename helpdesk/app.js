const config = require('./config.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var statsRouter = require('./routes/stats');
var votesRouter = require('./routes/votes');

//ADICIONEI
require('dotenv').config()
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV);

var app = express();
app.set('view engine', 'ejs');

//COMENTEI
// // Connecting to the database
// mongoose.connect(config.url, {
//   useNewUrlParser: true
// }).then(() => {
//   console.log("Successfully connected to the database");
// }).catch(err => {
//   console.log('Could not connect to the database. Exiting now...', err);
//   process.exit();
// });



//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'passport-tutorial',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}));

if (!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb://localhost/helpdesk');
mongoose.set('debug', true);

//Adicionei
require('./helpers/login/models/Users');
require('./helpers/login/config/passport');
app.use(require('./helpers/login/routes'));

app.use('/', indexRouter);
app.use('/stats', statsRouter);
app.use('/votes', votesRouter);

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    //res.sendStatus(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));

module.exports = app;