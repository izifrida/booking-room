// set up ======================================================================
const express = require('express');
const app = express(); 						// create our app w/ express
const port = process.env.PORT || 8080; 				// set the port
// load the database config
express.app = app;
require('./config/express.js');
app.use(require('./app/routes.js'));
require('./config/passport.js');
//======================
app.listen(port);
console.log("App listening on port " + port);