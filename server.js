'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/char_sheet_dev');

app.use(express.static(__dirname + '/build'));

var charRouter = require(__dirname + '/routes/char_sheets_router.js');
app.use('/api', charRouter);

app.listen(3000, function() {
  console.log("Server listening...");
});
