module.exports = function(app) {
  app.controller('SigninController', ['$scope', '$location', '$http', '$base64', '$cookies', function($scope, $location, $http, base64, $cookies) {
    $scope.buttonText = "Log In";
    $scope.user = {};
    $scope.changePlacesText = "Or Create a New User";

    $scope.changePlaces = function() {
      return $location.path('/signup');
    };

    $scope.sendToServer = function(user) {
      $http({
        method: 'GET',
        url: '/api/signin',
        headers: {
          'Authorization': 'Basic ' + base64.encode(user.username + ':' + user.password)
        }
      })
        .then(function(res) {
          $cookies.put('eat', res.data.token);
          $scope.getUsername();
          $location.path('/sheets');
        }, function(res) {
          console.log(res);
        });
    };
  }]);
};
