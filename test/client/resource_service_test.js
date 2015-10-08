require('../../client/js/app');

describe('resource service', function() {
  beforeEach(angular.mock.module('charSheetApp'));

  var ResourceService;
  var $httpBackend;
  var sheetsResource;

  beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
    ResourceService = Resource;
    $httpBackend = _$httpBackend_;
    sheetsResource = ResourceService('sheets');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a GET request', function() {
    $httpBackend.expectGET('/api/sheets').respond(200, [{_id: 1, name: 'TEST SHEET'}]);
    
    sheetsResource.getAll(function(err, data) {
      expect(err).toBe(null);
      expect(Array.isArray(data)).toBe(true);
    });
    
    $httpBackend.flush();
  });
});
