"use strict";

const User = require('../user.model');

module.exports = async function (req, res, next) {
    let users;
    let userModel = new User();
    try {
        users = await userModel.usersList();
    } catch (ex) {
        console.log(ex);
    }
    return res.send(users);
};