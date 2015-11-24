'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var httpBasic = require(__dirname + '/../lib/http_basic');
var userEvents = require(__dirname + '/../lib/user_events');

var usersRouter = module.exports = exports = express.Router();


usersRouter.post('/signup', jsonParser, function(req, res) {
  userEvents.emit('validate_new_user', req, res);
});

usersRouter.get('/signin', httpBasic, function(req, res) {
  userEvents.emit('authenticate', req, res);
});
