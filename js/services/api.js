define(['./module', 'ng-resource'], function (services) {
    'use strict';
    var baseUrl = 'http://localhost:8080';
    services.service('apiService', ['ngResource'])
        .factory('Ontology', ['$resource', function ($resource) {
            return $resource(
                baseUrl + '/ontology',
                {},
                {
                    list: {
                        method: 'GET'
                    }
                }
            );
        }])

        .factory('MockTest', ['$resource', function ($resource) {
            return $resource(
                baseUrl + '/mock_test/:id',
                {id: '@id'}
            );
        }])

        .factory('Batches', ['$resource', function ($resource) {
            return $resource(
                baseUrl + '/batch',
                {},
                {
                    list: {
                        method: 'GET'
                    },
                    create: {
                        method: 'POST'
                    }
                }
            );
        }])

        .factory('Batch', ['$resource', function ($resource) {
            return $resource(
                baseUrl + '/batch/:id',
                {id: '@id'},
                {
                    get: {
                        method: 'GET'
                    },
                    update: {
                        method: 'PUT'
                    },
                    deactivate: {
                        method: 'DELETE'
                    },
                    activate: {
                        method: 'PUT'
                    }
                }
            );
        }])

        .factory('Students', ['$resource', function ($resource) {
            return $resource(
                baseUrl + '/institute_student',
                {},
                {
                    list: {
                        method: 'GET'
                    },
                    create: {
                        method: 'POST'
                    }
                }
            );
        }])

        .factory('Student', ['$resource', function ($resource) {
            return $resource(
                baseUrl + '/institute_student/:id',
                {id: '@id'},
                {
                    get: {
                        method: 'GET'
                    },
                    update: {
                        method: 'PUT'
                    }
                }
            );
        }])

        .factory('AvailableMockTests', ['$resource', function ($resource) {
            return $resource(
                baseUrl + '/institute_mock_test',
                {},
                {
                    list: {
                        method: 'GET'
                    }
                }
            );
        }])

        .factory('AvailableMockTest', ['$resource', function ($resource) {
            return $resource(
                baseUrl + '/institute_mock_test/:id',
                {id: '@id'},
                {
                    get: {
                        method: 'GET'
                    },
                    push: {
                        method: 'POST'
                    }
                }
            );
        }])

        .factory('InstituteAnalysis', ['$resource', function ($resource) {
            return $resource(
                baseUrl + '/institute_analysis',
		        {},
                {
                    get: {
                        method: 'GET'
                    }
                }
            );
        }])

        .factory('InstituteStudentAnalysis', ['$resource', function ($resource) {
            return $resource(
                baseUrl + '/institute_student_analysis',
                {},
                {
                    get: {
                        method: 'GET'
                    }
                }
            );
        }])
});
