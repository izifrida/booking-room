'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

exports.create = function (req, res) {
    let user = new User();

    if (!req.body.email || !req.body.password) {
        return res.status(403).json({'msg': 'please check email or password'});
    }

    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, user) => {
        if (err) {
            console.log("Not created. Error:" + err);
            return res.status(403).json({'msg': 'something went wrong'})
        }
        return res.json(user);
    });
};

exports.getAll = function (req, res) {
    User.find({}, (err, users) => {
        if (err) throw err;
        return res.json(users);
    })
};

exports.logIn = function (req, res) {
    const payload = {
        id: req.user._id,
        admin: req.user.admin
    };
    const token = jwt.sign(payload, config.secret, {
        expiresIn: 1440 * 60 // expires in 24 hours
    });
    res.json({token: token});
};

exports.editUser = function (req, res) {
    if (req.decoded.id === req.body._id) {
        if (!req.body.email || !req.body.password) {
            return res.status(403).json({'msg': 'please check email or password'});
        }
        User.findById(req.body._id, (err, user) => {
            if (err) return consol.log(err);

            user.email = req.body.email;
            user.password = req.body.password;

            user.update(user, function (err, response) {
                if (err) {
                    return res.status(403).json({'msg': 'something went wrong'})
                }
                return res.json(response);
            })
        });
    }
};

