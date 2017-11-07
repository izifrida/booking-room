"use strict";

const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../src/user/user.model');
let userModel = new User();

const local = require('./strategy/local');

// use these strategies
passport.use(local);

