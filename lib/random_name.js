'use strict';

var randomstring = require('randomstring');

module.exports = function() {
  return randomstring.generate({
    length: Math.floor(Math.random() * 5) + 4, //generates a random number between 4 and 8
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  });
};
