'use strict'
define(['./module', '../services/index', 'underscore'], function (controllers, services, _) {
    'use strict';
    controllers.controller('MainCtrl', ['$scope', '$state', 'enums', '$timeout', 'Batches', 'InstituteAnalysis', 
        function ($scope, $state, Enums, $timeout, Batches, InstituteAnalysis) {
        $scope.Enums = Enums;
        

        $state.go('main.institute_analysis')
}])

})