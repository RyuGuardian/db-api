'use strict';

module.exports = function(err, res) {
  if(err.message === "Character Sheet validation failed") {
    res.status(418).json({msg: 'entry invalid; try again'});
  }

  res.status(500).json({msg: 'server error'});
};
