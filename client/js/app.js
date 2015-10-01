require('angular/angular');

var charSheetApp = angular.module('charSheetApp', []);

charSheetApp.controller('CharSheetController', ['$scope', function($scope) {
  $scope.description = 'Create a character sheet';
}]);
