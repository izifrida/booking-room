"use strict";

const User = require('../user.model');

module.exports = async function (req, res, next) {
    console.log(req.body);
    let user;
    let userModel = new User();

    const {email, password, _id} = req.body;

    if (!email || !password) {
        return res.status(400).json({'msg': 'please check email or password'});
    }

    if (req.session.passport.user === _id) {
        try {
            user = await userModel.updateUser({email, password, _id});
        } catch (ex) {
            console.log(ex);
        }

        return res.send(user);
    }
    else {
        return res.send("Editing another user is forbidden")
    }

};