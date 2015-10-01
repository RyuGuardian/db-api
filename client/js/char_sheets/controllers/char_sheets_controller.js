module.exports = function(app) {
  app.controller('CharSheetsController', ['$scope', '$http', function($scope, $http) {
  $scope.sheets = [];

  $scope.getAll = function() {
    $http.get('/api/sheets')
      .then(function(res) {       //successful response from GET request...
        $scope.sheets = res.data; //...gives us sheets
      }, function(res) {          //failed response
        console.log(res);
      });
  };

  $scope.createCharacterSheet = function(sheet) {
    $http.post('/api/sheets', sheet)
      .then(function(res) {
        $scope.sheets.push(res.data);
        $scope.newSheet = null;
      }, function(res) {
        console.log(res);
      });
  };

  $scope.removeSheet = function(sheet) {
    $scope.sheets.splice($scope.sheets.indexOf(sheet), 1);
    $http.delete('/api/sheets/' + sheet._id, sheet)
      .then(function(res) {
      }, function(res) {
        $scope.getAll();
        console.log(res);
      });
  };

  }]);
};
