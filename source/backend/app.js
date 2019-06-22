const config = require("./config.js");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
const passport = require("passport");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const usersJWT = require("./helpers/login/routes/api/users");

var indexRouter = require("./routes/index");
var statsRouter = require("./routes/stats");
var votesRouter = require("./routes/votes");
var dashRouter = require("./routes/index");
const cron = require('node-cron');
const moment = require('moment');
const issueService = require('./services/servicesBD/servicebd.issues');
const usersService = require('./services/servicesBD/servicebd.users');
const issueCreate = require('./controlers/Issue');
const usersCreate = require('./controlers/User');
const issuesRouter = require('./routes/issues');
const usersRouter = require('./routes/users');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('swagger.yaml');


//ADICIONEI
require("dotenv").config();
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";
console.log(process.env.NODE_ENV);

var app = express();
app.set("view engine", "ejs");
// Passport middleware
app.use(passport.initialize());
// Passport config

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
app.use(require("morgan")("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "passport-tutorial",
    cookie: {
      maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect("mongodb://localhost/helpdesk");
mongoose.set("debug", true);

app.use("/", indexRouter);
app.use("/stats", statsRouter);
app.use("/votes", votesRouter);
app.use('/issues', issuesRouter);
app.use('/users', usersRouter);

// Routes
app.use("/api/users", usersJWT);

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    //res.sendStatus(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000/"));

cron.schedule('* * * * *', async () => {
  console.log('---------------------');
  console.log('Running Cron Job');
  console.log('running a task every minute');

  debugger;
  const date = moment().subtract(5, 'minutes').toISOString(); // or format() - see below

  const resIssue = await issueService.getIssueByDate(date);
  issueCreate.createIssue(resIssue);
  const resUser = await usersService.getForce();
  usersCreate.createUser(resUser);

});

module.exports = app;