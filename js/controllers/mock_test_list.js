define(['./module', '../services/index', 'underscore', 'jquery'], function (controllers, services, _, $) {
    'use strict';
    controllers.controller('MockTestListCtrl', ['$scope', '$state', 'enums', '$timeout', 'Batches', 'AvailableMockTests', 'AvailableMockTest', function ($scope, $state, Enums, $timeout, Batches, AvailableMockTests, AvailableMockTest) {
        $scope.Enums = Enums;
        var DEFAULT_PAGE_LIMIT = 10;
        $state.params.page = $state.params.page ? parseInt($state.params.page) : 1;
        $state.params.limit = $state.params.limit ? parseInt($state.params.limit) : DEFAULT_PAGE_LIMIT;

        //$state params that this page accepts difficulty
        //batches_pushed_to
        //page&limit'
        if ($state.params.batches_pushed_to instanceof Array)
            $state.params.batches_pushed_to = $state.params.batches_pushed_to.map(function (b) {
                return parseInt(b);
            });
        if ($state.params.batches_pushed_to instanceof String || typeof($state.params.batches_pushed_to) === 'string')
            $state.params.batches_pushed_to = [parseInt($state.params.batches_pushed_to)];

        $scope.filters = {
            difficulty: typeof($state.params.difficulty) == 'undefined' ? 0 : $state.params.difficulty,
            batches_pushed_to: typeof($state.params.batches_pushed_to) == 'undefined' ? 0 : $state.params.batches_pushed_to,
            page: $state.params.page,
            limit: $state.params.limit,
            offset: ($state.params.page-1)*$state.params.limit
        };
        console.log($scope.filters)
        ﻿
        //ABove console will print Object {difficulty: 0, batches_pushed_to: 0, page: 1, limit: 10, offset: 0}


        //WHen the page loads for the first time, it will get data from Batches
        //Service with the default $scope.filters
        $scope.applyFilters = function() {
            showLoader();
            var filterData = angular.copy($scope.filters);
            for (var k in filterData) {
                if (filterData[k] == 0)
                    delete filterData[k];
            }
            var batchList = Batches.list(filterData);
            batchList.$promise.then(function (bData) {
                console.log(bData)
                $scope.batches = bData.batches; //Gets a list of batches based on the filters 

                if (filterData.batches_pushed_to instanceof Array)
                    filterData.batches_pushed_to = filterData.batches_pushed_to.join(',');
                console.log(filterData)
                AvailableMockTests.list(filterData).$promise.then(function (mData) {
                    $scope.totalItems = mData.total;
                    $scope.totalPages = Math.ceil($scope.totalItems/filterData.limit);
                    $scope.mock_tests = mData.mock_tests;

                    //mock_tests.batches_pushed_to would have a list of single entry
                    // of the array of {"id", "name"} where name corresponds to the name of the bacthes
                    // to which this mock test has been pushed
                    $scope.mock_tests.forEach(function(mock_test) {
                        mock_test.batches_str = _.pluck(mock_test.batches_pushed_to, 'name').join(',');
                    });
                    $timeout(function () {
                        $(".chosen-select").chosen({
                            'width':'100%',
                            'white-space':'nowrap',
                            disable_search_threshold: 10
                        });
                    }, 200);
                    hideLoader();
                });
            });
        };

        $scope.filtersChange = function() {
            $scope.filters.page = 1;
            for (var f in $scope.filters) {
                if ($scope.filters[f] == '0') {
                    delete $scope.filters[f];
                }
            }
            $state.transitionTo('main.mock_tests', $scope.filters);
        };

        $scope.goToPage = function(event, pageNo) {
            event.preventDefault();
            pageNo = parseInt(pageNo);
            $scope.filters.page = pageNo;
            $scope.filters.offset = (pageNo-1)*$scope.filters.limit;
            for (var f in $scope.filters) {
                if ($scope.filters[f] == '0') {
                    delete $scope.filters[f];
                }
            }
            $state.transitionTo('main.mock_tests', $scope.filters);
            return false;
        };

        $scope.applyFilters();
    }]);
});