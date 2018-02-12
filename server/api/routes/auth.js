var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user-model.js');
var jwt = require('express-jwt');
var config = require('../../config/config.js');
var passport = require('passport');


var auth = jwt({secret: config.secret, userProperty: 'payload'});



router.post('/signup', function(req, res) {
  var user = new User();

  user.username = req.body.username;

  user.password = req.body.password

  console.log(user);
  user.save(function(err) {
    var token;
    token = user.generateJWT();
    res.status(200);
    res.json({
      "token" : token
    });
  });
});

router.post('/login', function(req, res) {


User.findOne({username: req.body.username}, function(err, usr){

if(err) {
  console.log(err)
}
if(!usr){
  console.log('No user was found');
} else if (usr){

       usr.comparePassword(req.body.password, function(isMatch) {
            if (!isMatch) {
                console.log("Attempt failed to login with user:" + usr.username);
                return res.send(401);
            }
             var token;
              token = usr.generateJWT();
              console.log('user role is:' + usr.role);
              res.status(200);
              res.json({
                "token" : token
              });

       });
}
})
});

router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
 
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
