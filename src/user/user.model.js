"use strict";

const mongoose = require('mongoose');
const userSchema = require('./user-schema.js');

class User {
    constructor() {
        this.user = mongoose.model('User', userSchema);
    }

    createUser(data) {
        return this.user.create(data)
            .then(user => user.toJSON())
    }

    updateUser(data) {
        return this.user
            .findByIdAndUpdate(data._id, data, {new: true})
            .then(user => user.toJSON())
    }

    usersList() {
        return this.user.find({}, (err, users) => {
            if (err) console.log(err);
            return users => users.toJSON();
        })
    }

    deleteAll() {
        return this.user.remove({}, (err) => {
            if (err) console.log(err);
            return console.log("All users deleted")
        });
    }
}

module.exports = User;
