var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.js');

var UserSchema = new Schema({
  username: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
    role:  {
        type: String,
        enum : ['USER','Admin', 'msADMIN'],
        default: 'USER'
    }
});

// Bcrypt middleware on UserSchema
UserSchema.pre('save', function(next) {  
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});

//Password verification
UserSchema.methods.comparePassword = function(password, cb) {  
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

UserSchema.methods.generateJWT = function(){

    //set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      _id: this.id,
      username: this.username,
      role: this.role,
      exp: parseInt(exp.getTime() / 1000),
    }, config.secret);
};

module.exports = mongoose.model('User', UserSchema);
