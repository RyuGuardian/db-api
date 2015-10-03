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
      $httpBackend.expectGET('/api/sheets').respond(200, [{name: 'TESTER'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.sheets[0].name).toBe('TESTER');
    });

    it('should be able to create a note', function() {
      $httpBackend.expectPOST('/api/sheets', {name: 'TESTER3'}).respond(200, {_id: 1, name: 'TESTER2'});
      $scope.newSheet = {name: 'HELLO'};
      $scope.createCharacterSheet({name: 'TESTER3'});
      $httpBackend.flush();
      expect($scope.sheets[0].name).toBe('TESTER2');
      expect($scope.newSheet).toBe(null);
    });
  });
});