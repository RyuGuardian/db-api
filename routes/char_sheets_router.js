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
  var newSheet = new CharSheet(req.body);
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

  CharSheet.update({_id: req.params.id}, newSheetBody, function(err, data) {
    if(err) {
      handleError(err, res);
    }

    res.json({msg: 'Name changed'});
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