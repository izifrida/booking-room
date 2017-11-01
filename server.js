const express = require('express');
const app = express(); 						// create our app w/ express
const port = process.env.PORT || 8081; 				// set the port

let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let database = require('./config/database.js'); 			// load the database config
const passport = require('passport');
const mongoose = require('mongoose');

// load the database config
express.app = app;

//DB
mongoose.connect(database.localUrl);

// configuration ==============================================================
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

//require('./config/express.js');
//require('./config/passport.js');
app.use(require('./src/routes.js'));


//======================
app.listen(port);
console.log("App listening on port " + port);