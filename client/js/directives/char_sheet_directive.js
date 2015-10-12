module.exports = function(app) {
  app.directive('sheetForm', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/js/directives/templates/sheet_form.html',
      scope: {
        labelText: '@',
        buttonText: '@',
        sheet: '=',
        save: '&'
      }
    }
  });
};
