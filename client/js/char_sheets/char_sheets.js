module.exports = function(app) {
  require('./controllers/char_sheets_controller')(app);
  require('../directives/char_sheet_directive')(app);
};
