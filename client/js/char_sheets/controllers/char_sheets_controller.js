module.exports = function(app) {
  app.controller('CharSheetsController', ['$scope', 'Resource', function($scope, Resource) {
    $scope.sheets = [];
    $scope.newSheet = {};
    var sheetResource = Resource('sheets');

    $scope.getAll = function() {
      sheetResource.getAll(function(err, data) {
        if(err) {
          return console.log(err);
        }

        $scope.sheets = data;
      });
    };

    $scope.createCharacterSheet = function(sheet) {
      sheetResource.create(sheet, function(err, data) {
        if(err) {
          return console.log(err);
        }

        $scope.newSheet = {};
        $scope.sheets.push(data);
      });
    };

    $scope.changeName = function(sheet) {
      sheetResource.update(sheet, function(err) {
        sheet.changingName = false;
        
        if(err) {
          return console.log(err);
        }
      });
    };

    $scope.changingName = function(sheet) {
      sheet.oldName = sheet.name;
      sheet.changingName = true;
    };

    $scope.cancelNameChange = function(sheet) {
      sheet.changingName = false;
      sheet.name = sheet.oldName;
    };

    $scope.removeSheet = function(sheet) {
      sheetResource.remove(sheet, function(err) {
        if(err) {
          $scope.getAll();
          return console.log(err);
        }

        $scope.sheets.splice($scope.sheets.indexOf(sheet), 1);
      });
    };
  }]);
};
