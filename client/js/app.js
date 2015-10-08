require('angular/angular');
var angular = window.angular;

var charSheetApp = angular.module('charSheetApp', []);

require('./services/entry')(charSheetApp);  //services, then directives; they are needed on the global level
require('./char_sheets/char_sheets')(charSheetApp);
