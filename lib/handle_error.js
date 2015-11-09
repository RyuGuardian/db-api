'use strict';

module.exports = function(err, res) {
  if(err.message === "Character Sheet validation failed" || "Validation failed") {
    res.status(418).json({msg: 'entry invalid; try again'});
  }
  else {  //using else because otherwise get "Uncaught Error: Can't set headers after they are sent."
            //when using invalid data to update (PUT)
    res.status(500).json({msg: 'server error'});
  }
};
