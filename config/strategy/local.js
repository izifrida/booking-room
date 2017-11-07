"use strict";

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../src/user/user.model');

let userModel = new User();

module.exports = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        userModel.user.findOne({email: email}, function (err, user) {
            if (err) return done(err);

            if (!user) {
                return done(null, false, {message: 'Unknown user'});
            }

            if (!user.authenticate(password)) {
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
        });
    }
);