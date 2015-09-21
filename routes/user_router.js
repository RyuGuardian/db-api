'use strict';

var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
// var eat = require('eat');
// var secretkey = require('secretkey');
var httpBasic = require(__dirname + '/../lib/http_basic');

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();

  //TODO: make sure usernames are unique and make sure basic.username and basic.password are copulated.
  newUser.basic.username = newUser.username = req.body.username;

  newUser.generateHash(req.body.password, function(err, hash) {
    if(err) {
      return handleError(err, res);
    }

    //TODO: use event emitters (preferred to promises) to get rid of 'pyramids of doom'
    newUser.save(function(err, data) {
      if(err) {
        return handleError(err, res)
      }

      newUser.generateToken(function(err, token) {
        if(err) {
          return handleError(err, res)
        }

        res.json({token: token});
      });
    });
  });
});

usersRouter.get('/signin', httpBasic, function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if(err) {
      return handleError(err, res);
    }

    if(!user) {
      console.log('could not authenticate: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticate'});
    }

    user.compareHash(req.auth.password, function(err, hashRes) {
      if(err) {
        return handleError(err, res);
      }

      if(!hashRes) {
        console.log('could not authenticate: ' + req.auth.username);
        return res.status(401).json({msg: 'could not authenticate'});
      }

      //TODO: fix pyramid of doom
      user.generateToken(function(err, token) {
        if(err) {
          return handleError(err, res);
        }

        res.json({token: token});
      });
    });
  })
});
