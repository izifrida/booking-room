//var user = require('./controllers/users.js');
const local = require('../config/passport/local');


const models = {};
// models ============================================================

module.exports = function (app, passport, models) {

  // Sign Up //
  app.post('/api/users', (req, res) => {
    let UserModel = models.user;
    let user = new UserModel();

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
      models.user.find({}, (err, users) => {
        return res.json(users);
      })
    });
  });

  // Sign In //
  app.post('/api/login',
    passport.authenticate('local'),
    (req, res) => {
      return res.json(req.user);
    });

};