'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var CharSheet = require(__dirname + '/../models/char_sheet');
var handleError = require(__dirname + '/../lib/handle_error');

var charSheetsRouter = module.exports = exports = express.Router();

// charSheetsRouter.use(jsonParser);
charSheetsRouter.get('/sheets', function(req, res) {
  CharSheet.find({}, function(err, data) {
    if(err) {
      return handleError(err, res);
    }
      res.json(data);
  });
});

charSheetsRouter.post('/sheets', jsonParser, function(req, res) {
  /*console.log('post: ', req.body);  //comment this out when not in use*/
  var newSheet = new CharSheet(req.body);
  /*console.log('new sheet: ', newSheet);  //comment this out when not in use*/
  newSheet.save(function(err, data) {
    if(err) {
      handleError(err, res);
    }
    res.json(data);
  });
});

charSheetsRouter.put('/sheets/:id', jsonParser, function(req, res) {
  var newSheetBody = req.body;
  delete newSheetBody._id;
  //console.log('PUT: ', req.body);
  CharSheet.update({_id: req.params.id},
    newSheetBody,
    {runValidators: true},  //adding this causes async problems ("Uncaught Error: Can't set headers after they are sent.")
    function(err, data) {

    if(err) {
      //console.log('going to handle error\n  err message: ', err.message);
      handleError(err, res);
      console.log("shouldn't get here");  //problem: it still gets here when trying to update with invalid data
    }
    else {  //using else because process runs through if validation fails
      res.json({msg: 'Name changed'});
    }
  });
});

charSheetsRouter.delete('/sheets/:id', jsonParser, function(req, res) {
  CharSheet.remove({_id: req.params.id}, function(err, data) {
    if(err) {
      handleError(err, res);
    }

    res.json({msg: 'Delete successful'});
  });
});