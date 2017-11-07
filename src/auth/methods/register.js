"use strict";

const User = require('../../user/user.model');

module.exports = function (req, res, next) {
    let user;
    let userModel = new User();

    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({'msg': 'please check email or password'});
    }

    userModel.user.find({"email": email}).exec(async function (err, result) {
        if (!err && result.length === 0) {
            try {
                user = await userModel.createUser({email, password});
            } catch (ex) {
                console.log(ex);
            }
            return res.send(user);
        } else {
            return res.status(400).json({'msg': 'user already exists'});
        }
    });

}
;