var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var database = require('./database.js'); 			// load the database config

module.exports = function (app, passport, mongoose) {
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