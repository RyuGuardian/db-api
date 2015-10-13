require('angular/angular');
require('angular-route');
var angular = window.angular;

var charSheetApp = angular.module('charSheetApp', ['ngRoute']);

require('./services/entry')(charSheetApp);  //services, then directives; they are needed on the global level
require('./char_sheets/char_sheets')(charSheetApp);
require('./users/users')(charSheetApp);

charSheetApp.config(['$routeProvider', function($route) {
  $route
    .when('/sheets', {
      templateUrl: '/templates/views/sheets_view.html'
    })
    .when('/signup', {
      templateUrl: '/templates/views/signup_signin_view.html',
      controller: 'SignupController'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);
