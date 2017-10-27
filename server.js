// set up ======================================================================
const express = require('express');
const app = express(); 						// create our app w/ express
const mongoose = require('mongoose'); 				// mongoose for mongodb
const port = process.env.PORT || 8080; 				// set the port
const database = require('./config/database.js'); 			// load the database config
const passport = require('passport');
const models = {};

mongoose.connect(database.localUrl);
models.user = require('./app/models/user-schema.js')(mongoose);

require('./config/passport.js')(passport);
require('./config/express.js')(app, passport);

require('./app/routes.js')(app, passport, models);
//======================
app.listen(port);
console.log("App listening on port " + port);