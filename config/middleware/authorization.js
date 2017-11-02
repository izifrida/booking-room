'use strict';

const mongoose = require('mongoose');
const passport = require('passport');

exports.isAuthorized = function (req, res, next) {
    return req.isAuthenticated()
        ? next()
        : res.send("User is not authorized!!!")
};