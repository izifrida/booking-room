//var user = require('./controllers/users.js');
const local = require('../config/passport/local');
const user = require('../app/controllers/user.controller');
const models = {};

const auth = require('../config/middleware/authorization');

module.exports = function (app, passport) {

    // Sign Up //
    app.post('/api/users', user.create);

    //Get all users //
    app.get('/api/users', user.getAll);

    // Sign In //
    app.post('/api/login', passport.authenticate('local'), user.logIn);

    // Edit user //
    app.put('/api/users', auth.isAuth, user.editUser);

};