const User = require('../user.model');

module.exports = async function (req, res, next) {
  let user;
  let userModel = new User();

  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({'msg': 'please check email or password'});
  }

  try {
    user = await userModel.createUser({email, password});
  } catch (ex) {
    console.log(ex);
  }

  return res.send(user);
};