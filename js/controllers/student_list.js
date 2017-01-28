define(['./module', '../services/index', 'underscore', 'jquery'], function (controllers, services, _, $) {
    'use strict';
    controllers.controller('StudentListCtrl', ['$scope', '$state', 'enums', '$timeout', 'Batches', 'Students', 'Student', function ($scope, $state, Enums, $timeout, Batches, Students, Student) {
        $scope.Enums = Enums;
        var DEFAULT_PAGE_LIMIT = 10;
        $state.params.page = $state.params.page ? parseInt($state.params.page) : 1;
        $state.params.limit = $state.params.limit ? parseInt($state.params.limit) : DEFAULT_PAGE_LIMIT;

        $scope.noFilters = true;

        if ($state.params.branches instanceof Array)
            $state.params.branches = $state.params.branches.map(function (b) {
                return b;
            });
        if ($state.params.branches instanceof String || typeof($state.params.branches) === 'string')
            $state.params.branches = [$state.params.branches];

        $scope.filters = {
            batch_id: typeof($state.params.batch_id) == 'undefined' ? 0 : $state.params.batch_id,
            batch_type: typeof($state.params.batch_type) == 'undefined' ? 0 : $state.params.batch_type,
            target_year: typeof($state.params.target_year) == 'undefined' ? 0 : $state.params.target_year,
            branches: typeof($state.params.branches) == 'undefined' ? 0 : $state.params.branches,
            query: typeof($state.params.query) == 'undefined' ? '' : $state.params.query,
            page: $state.params.page,
            limit: $state.params.limit,
            offset: ($state.params.page - 1) * $state.params.limit
        };

        if ($scope.filters.batch_id || $scope.filters.batch_type || $scope.filters.target_year || $scope.filters.branches || $scope.filters.query)
            $scope.noFilters = false;

        $scope.applyFilters = function () {
            showLoader();
            var filterData = angular.copy($scope.filters);
            for (var k in filterData) {
                if (filterData[k] == 0 || filterData[k] == '')
                    delete filterData[k];
            }
            var batchList = Batches.list(filterData);
            batchList.$promise.then(function (bData) {
                $scope.batches = bData.batches;
                if (filterData.branches instanceof Array)
                    filterData.branches = filterData.branches.join(',');
                var studentList = Students.list(filterData);
                studentList.$promise.then(function (sData) {
                    $scope.totalItems = sData.total;
                    $scope.totalPages = Math.ceil($scope.totalItems / filterData.limit);
                    $scope.students = sData.students;
                    $scope.students.forEach(function (student) {
                        student.batches_str = _.pluck(student.batches, 'name').join(',');
                        student.target_exams_str = student.target_exams.map(function (e) {
                            return Enums.TARGET_EXAMS[e];
                        }).join(',');
                    });
                    $timeout(function () {
                        $(".chosen-select").chosen({
                            'width': '100%',
                            'white-space': 'nowrap',
                            disable_search_threshold: 10
                        });
                    }, 200);
                    hideLoader();
                });
            });
        };

        $scope.filtersChange = function () {
            $scope.filters.page = 1;
            for (var f in $scope.filters) {
                if ($scope.filters[f] == '0' || $scope.filters[f] == '') {
                    delete $scope.filters[f];
                }
            }
            $state.transitionTo('students', $scope.filters);
        };

        $scope.search = function(event) {
            if (event.charCode == 13) {
                $scope.filtersChange();
            }
        };

        $scope.goToPage = function (event, pageNo) {
            event.preventDefault();
            pageNo = parseInt(pageNo);
            $scope.filters.page = pageNo;
            $scope.filters.offset = (pageNo - 1) * $scope.filters.limit;
            for (var f in $scope.filters) {
                if ($scope.filters[f] == '0') {
                    delete $scope.filters[f];
                }
            }
            $state.transitionTo('students', $scope.filters);
            return false;
        };

        $scope.applyFilters();
    }]);
});
