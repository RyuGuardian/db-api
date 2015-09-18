'use strict';

module.exports = function() {
  var races = ['human', 'elf', 'orc', 'dwarf', 'halfling', 'troll', 'goblin'];

  return races[Math.floor(Math.random() * 7)];
};
