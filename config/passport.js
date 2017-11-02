"use strict";

const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../src/user/user.model');
let userModel = new User();

const local = require('./strategy/local');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    userModel.user.findById(id, function (err, user) {
        done(err, user);
    });
});

// use these strategies
passport.use(local);

