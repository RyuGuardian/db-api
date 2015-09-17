'use strict';

var mongoose = require('mongoose');

var charSheetSchema = new mongoose.Schema({
  name: {type: String, trim: true, uppercase: true, match: /[A-Za-z]+/},
  race: {type: String, default: 'human', trim: true, lowercase: true, enum: ['human', 'elf', 'orc', 'dwarf', 'halfling', 'troll', 'goblin']},
  gender: {type: String, trim: true, uppercase: true},
  strength: {type: Number, min: 10, max: 255},
  intelligence: {type: Number, min: 10, max: 255},
  deceased: {type: Boolean, default: false}
});

charSheetSchema.path('gender').validate(function(data){
  if (data === 'F' || data === 'M' || data === 'OTHER'){
    return true;
  }
  return false;
});

module.exports = mongoose.model('Character Sheet', charSheetSchema);
