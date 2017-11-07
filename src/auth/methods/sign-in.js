"use strict";

const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('../../../config/passport');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

module.exports = function (req, res, next) {
    passport.authenticate('local',
        function (err, user, info) {
            if (err) return next(err);

            else if (user) {
                req.logIn(user, {session: false}, (err) => {  // disable session: {session: false}
                    if (err) return next(err);
                    const payload = {
                        id: user._id
                    };
                    const token = jwt.sign(payload, config.secret, {
                        expiresIn: 1440 * 60 // expires in 24 hours
                    });
                    return res.json({token: token});
                })
            } else return res.send(info.message)
        }
    )(req, res, next);
};
