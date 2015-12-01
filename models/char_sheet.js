'use strict';

var mongoose = require('mongoose');
var randomName = require(__dirname + '/../lib/random_name');
var randomRace = require(__dirname + '/../lib/random_race');

var charSheetSchema = new mongoose.Schema({
  name: {type: String, default: randomName, trim: true, uppercase: true, match: /^[A-Z]+$/},
  race: {type: String, default: randomRace, trim: true, lowercase: true, match: /^(human|elf|orc|dwarf|halfling|troll|goblin)$/},
  gender: {type: String, default: 'OTHER', trim: true, uppercase: true, match: /^(M|F|OTHER)$/},
  strength: {type: Number, default: 50, min: 10, max: 255},
  intelligence: {type: Number, default: 50, min: 10, max: 255},
  deceased: {type: Boolean, default: false}
});

//Functionality to add if time allows: validate (str + int <= 100) on new sheet, but allow >100 on level up
//Also, don't allow certain fields to be changeable after character is made (race, gender)?

charSheetSchema.methods.levelUp = function() {
  this.strength += Math.floor(Math.random() * 2) + 1;
  this.intelligence += Math.floor(Math.random() * 2) + 1;

  this.save(function(err) {
    if(err) {
      throw err;
    }
  });

  //this is returned even if save's validation fails (async problem)
    //(invalid info also gets saved for some reason)
  return 'Level up!';
};

module.exports = mongoose.model('CharacterSheet', charSheetSchema);
