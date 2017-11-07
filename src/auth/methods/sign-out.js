"use strict";

const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('../../../config/passport');

module.exports = function (req, res) {
    req.logout();
    res.send('User is logged out')
};
