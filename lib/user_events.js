'use strict';

var EventEmitter = require('events').EventEmitter;

var handleError = require(__dirname + '/handle_error');
var User = require(__dirname + '/../models/user');

var userEvents = new EventEmitter();

userEvents.on('validate_new_user', function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if(user) {
      return res.status(418).json({msg: 'name already taken'});
    }

    var newUser = new User();
    newUser.username = newUser.basic.username = req.body.username;

    userEvents.emit('save_new_user', req, res, newUser);
  });
});

userEvents.on('save_new_user', function(req, res, user) {
  user.generateHash(req.body.password, function(err, hash) {
    console.log('generating hash');
    if(err) {
      return handleError(err, res);
    }

    user.save(function(err, data) {
      console.log('saving');
      if(err) {
        return handleError(err, res);
      }

      userEvents.emit('generate_token', req, res, user);
    });
  });
});

userEvents.on('generate_token', function(req, res, user) {
  console.log('generating token');
  user.generateToken(function(err, token) {
    if(err) {
      return handleError(err, res)
    }

    res.json({token: token});
  });
});

userEvents.on('authenticate', function(req, res) {
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

      userEvents.emit('generate_token', req, res, user);
    });
  });
});

module.exports = userEvents;
