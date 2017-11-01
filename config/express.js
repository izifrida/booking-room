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

  /*  // use passport session
    app.use(passport.initialize());
    app.use(passport.session());*/
};