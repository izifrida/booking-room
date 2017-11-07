'use strict';

const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.isAuthorized = function (req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.json({success: false, message: 'Failed to authenticate token.'});
            req.decoded = decoded;
            next();
        })
    } else {
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }
};