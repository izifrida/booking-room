'use strict';
//create app
const express = require('express');
const app = express();
//set the port
const port = process.env.PORT || 8081;
//dependencies
let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
// load the database config
const passport = require('passport');
const mongoose = require('mongoose');
//Environment configuration
const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';
const config = require('./config/index')[env];

express.app = app;

// configuration
if (env !== 'test') {
    app.use(morgan('dev')); // log every request to the console
}

app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
// Initialize passport
app.use(passport.initialize());

app.use(require('./src/routes.js'));

connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function listen() {
    //if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
}

function connect() {
    const options = {server: {socketOptions: {keepAlive: 1}}};

    return mongoose.connect(config.db, options).connection;
}


module.exports = app;