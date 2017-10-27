//var user = require('./controllers/users.js');
var passport = require('passport');
var local = require('../config/passport/local');

module.exports = function(app, models, mongoose) {
    // Sign Up //
    app.post('/api/users', function(req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(403);
            return;
        };
        var User = models.user;
        var newUser = new User();
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.save(function(err, user) {
            if (err) {
                console.log("Not created. Error:" + err);
            };
            console.log(user.email + " created");
            models.user.find({}, function(err, users) {
                console.log(users);
            })
        });
    });

    // Sign In //
    app.post('/api/login',
        passport.authenticate('local'),
        function(req, res) {
            res.status(200);
        }
    );

};