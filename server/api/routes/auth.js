var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user-model.js');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.js');
var passport = require('passport');





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

router.get('/memberInfo', ensureAuthorized, function(req, res) {
  User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});
 
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        console.log(bearerToken);
        res.send(403);
    }
}

module.exports = router;
