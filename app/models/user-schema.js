//  Module dependencies //

var crypto = require('crypto');

module.exports = function(mongoose) {
    var collection = 'User';
    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        email: { type: String, default: '' },
        hashed_password: { type: String, default: '' },
        salt: { type: String, default: '' },
        admin: {type: Boolean, default: false}
    });

    UserSchema
        .virtual('password')
        .set(function(password) {
            this._password = password;
            this.salt = this.makeSalt();
            this.hashed_password = this.encryptPassword(password);
        })
        .get(function() {
            return this._password;
        });

    UserSchema.methods = {
        authenticate: function(plainText) {
            return this.encryptPassword(plainText) === this.hashed_password;
        },

        makeSalt: function() {
            return Math.round((new Date().valueOf() * Math.random())) + '';
        },

        encryptPassword: function(password) {
            if (!password) return '';
            try {
                return crypto
                    .createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex');
            } catch (err) {
                return '';
            }
        },
    };

    return mongoose.model(collection, UserSchema)
};