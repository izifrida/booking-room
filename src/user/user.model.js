const mongoose = require('mongoose');
const userSchema = require('./user-schema.js');

class User {
  constructor() {
    this.user = mongoose.model('User', userSchema);
  }

  createUser(data) {
    return this.user.create(data)
      .then(user => user.toJSON());
  }
}

module.exports = User;
