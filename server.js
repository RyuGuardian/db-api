'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/char_sheet_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

var charRouter = require(__dirname + '/routes/char_sheets_router');
app.use('/api', charRouter);
var userRouter = require(__dirname + '/routes/user_router');
app.use('/api', userRouter);

app.listen(3000, function() {
  console.log("Server listening...");
});
