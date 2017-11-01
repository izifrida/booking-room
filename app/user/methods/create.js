const User = require('../user.model');

module.exports = function (req, res, next) {
  let userData = {};
  let users;
  console.log('here');
  userData.email = req.body.email;
  userData.password = req.body.password;
  return res.status(403).json({'msg': 'please check email or password'});
  if (!userData.email || !userData.password) {
    return res.status(403).json({'msg': 'please check email or password'});
  }

  try {
    // users = yield User.createUser(userData);
  } catch (ex) {
    return next(ex);
  }

  return res.json(users);
  return next();
};