require(__dirname + '/../../client/js/app');
require('angular-mocks');

describe('character-sheet controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('charSheetApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = new $ControllerConstructor('CharSheetsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.sheets)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('CharSheetsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request when getAll() is called', function() {
      $httpBackend.expectGET('/api/sheets').respond(200, [{name: 'TEST GET'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.sheets[0].name).toBe('TEST GET');
    });

    it('should be able to create a character sheet', function() {
      $httpBackend.expectPOST('/api/sheets', {name: 'TEST CREATE'}).respond(200, {_id: 1, name: 'TEST POST'});
      $scope.newSheet = {name: 'TEST NULL NEW SHEET'};
      $scope.createCharacterSheet({name: 'TEST CREATE'});
      $httpBackend.flush();
      expect($scope.sheets[0].name).toBe('TEST POST');
      expect($scope.newSheet).toEqual({});
    });

    it('should be able to start to change a name, cancel it, and actually update a name', function() {
      var testSheet = {_id: 1, name: 'TEST NAME'};
      $httpBackend
        .expectPUT('/api/sheets/1', {_id: 1, name: 'TEST NAME', oldName: 'TEST NAME', changingName: false})
        .respond(200, {msg: 'Name changed'});
      $scope.changingName(testSheet);
      expect(testSheet.changingName).toBe(true);
      expect(testSheet.oldName).toBe('TEST NAME');
      testSheet.name = 'TEST CANCEL';
      $scope.cancelNameChange(testSheet);
      expect(testSheet.changingName).toBe(false);
      expect(testSheet.oldName).toBe('TEST NAME');
      expect(testSheet.name).toBe('TEST NAME');
      $scope.changeName(testSheet);
      $httpBackend.flush();
      expect(testSheet.changingName).toBe(false);
    });

    it('should be able to remove a character sheet', function() {
      var testSheet = {_id: 1, name: 'TEST REMOVE'};
      $scope.sheets[0] = testSheet;
      $httpBackend.expectDELETE('/api/sheets/1').respond(200, {msg: 'Delete successful'});
      $scope.removeSheet(testSheet);
      $httpBackend.flush();
      expect($scope.sheets[0]).toBe(undefined);
    });
  });
});