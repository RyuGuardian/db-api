require('angular/angular');
var angular = window.angular; //to make jshint happy
require('angular-route');
require('angular-base64');
require('angular-cookies');

var charSheetApp = angular.module('charSheetApp', ['ngRoute', 'base64', 'ngCookies']);

require('./services/entry')(charSheetApp);  //services, then directives; they are needed on the global level
require('./char_sheets/char_sheets')(charSheetApp);
require('./users/users')(charSheetApp);
require('./logout')(charSheetApp);

charSheetApp.config(['$routeProvider', function($route) {
  $route
    .when('/sheets', {
      templateUrl: '/templates/views/sheets_view.html'
    })
    .when('/signup', {
      templateUrl: '/templates/views/signup_signin_view.html',
      controller: 'SignupController'
    })
    .when('/signin', {
      templateUrl: '/templates/views/signup_signin_view.html',
      controller: 'SigninController'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);
