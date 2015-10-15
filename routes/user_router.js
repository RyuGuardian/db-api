'use strict';

var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var httpBasic = require(__dirname + '/../lib/http_basic');
var userEvents = require(__dirname + '/../lib/user_events');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var usersRouter = module.exports = exports = express.Router();


usersRouter.post('/signup', jsonParser, function(req, res) {
  userEvents.emit('validate_new_user', req, res);
});

usersRouter.get('/signin', httpBasic, function(req, res) {
  userEvents.emit('authenticate', req, res);
});

usersRouter.get('/username', jsonParser, eatAuth, function(req, res) {
  res.json({username: req.user.username});
});
