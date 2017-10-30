const session = require("express-session");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const database = require('./database.js'); 			// load the database config

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