"use strict";

const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('../../../config/passport');

module.exports = function (req, res, next) {
    passport.authenticate('local',
        function (err, user, info) {
            if (err) return next(err);

            else if (user) {
                req.logIn(user, (err) => {
                    if (err) return next(err);
                    return res.send('Signed in!!!');
                })
            } else return res.send(info.message)
        }
    )(req, res, next);
};
