const mongoose = require('mongoose');

class User {
  static createUser(data, response) {
    const User = mongoose.model('User');
    let user = new User();

    return user.save((err, data) => {
      if (err) {
        response({'msg': err});
      } else {
        user.find({}, (err, users) => {
          response(null, users);
        })
      }
    });
  }
}

module.exports = User;
