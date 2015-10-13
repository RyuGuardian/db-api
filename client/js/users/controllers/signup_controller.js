module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$http', function($scope, $http) {
    $scope.buttonText = 'Create New User';
    $scope.confirmPassword = true;
    $scope.user = {};

    $scope.passwordMatch = function(user) {
      return user.password === user.confirmation;
    };

    $scope.disableButton = function(user) {
      return ($scope.userForm.$invalid && !$scope.passwordMatch(user));
    };

    $scope.createUser = function(user) {
      $http.post('/api/signup', user)
        .then(function(res) {
          //save token into cookie
        }, function(res) {
          console.log(res);
        });
    };
  }]);
};
