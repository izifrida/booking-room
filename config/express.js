let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let database = require('./database.js'); 			// load the database config
const passport = require('passport');
const express = require('express');
const models = {};
const mongoose = require('mongoose');
const app = express.app;


module.exports = function () {

  //DB
  mongoose.connect(database.localUrl);

// configuration ==============================================================
  app.use(morgan('dev')); // log every request to the console
  app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // parse application/json
  app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
  app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());
};