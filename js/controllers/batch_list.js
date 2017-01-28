define(['./module', '../services/index', 'underscore', 'jquery'], function (controllers, services, _, $) {
    'use strict';
    controllers.controller('BatchListCtrl', ['$scope', '$state', 'enums', '$timeout', 'Batches', 'Batch', function ($scope, $state, Enums, $timeout, Batches, Batch) {
        $scope.Enums = Enums;
        $scope.filters = {
            days: typeof($state.params.days) == 'undefined' ? 0 : $state.params.days,
            type: typeof($state.params.type) == 'undefined' ? 0 : $state.params.type,
            target_year: typeof($state.params.target_year) == 'undefined' ? 0 : $state.params.target_year,
            branch: typeof($state.params.branch) == 'undefined' ? 0 : $state.params.branch
        };

        var styleChosen = function () {
            $timeout(function () {
                $(".chosen-select").chosen({
                    'width': '100%',
                    'white-space': 'nowrap',
                    disable_search: true
                });
            }, 200);
        };

        $scope.applyFilters = function () {
            showLoader();
            var filterData = angular.copy($scope.filters);
            for (var k in filterData) {
                if (filterData[k] == 0)
                    delete filterData[k];
            }
            var batchList = Batches.list(filterData);
            batchList.$promise.then(function (data) {
                $scope.batches = data.batches;
                styleChosen();
                hideLoader();
            });
        };

        $scope.filtersChange = function () {
            for (var f in $scope.filters) {
                if ($scope.filters[f] == '0') {
                    delete $scope.filters[f];
                }
            }
            $state.transitionTo('batches', $scope.filters);
        };

        $scope.deactivate = function (id) {
            Batch.deactivate({id: id}).$promise.then(function (data) {
                for (var i = 0; i < $scope.batches.length; i++) {
                    if ($scope.batches[i].id == id) {
                        $scope.batches[i].status = 0;
                        break;
                    }
                }
            }, function(resp) {
                if (resp.data.code == 4009) {
                    $('#deactivateModal').modal();
                    $scope.deactivateBatchMessage = resp.data.message;
                }
            });
        };

        $scope.activate = function (id) {
            var batch;
            for (var i = 0; i < $scope.batches.length; i++) {
                if ($scope.batches[i].id == id) {
                    batch = angular.copy($scope.batches[i]);
                    break;
                }
            }
            delete batch.clazz;
            batch.status = 1;
            Batch.activate(batch).$promise.then(function (data) {
                for (var i = 0; i < $scope.batches.length; i++) {
                    if ($scope.batches[i].id == id) {
                        $scope.batches[i].status = 1;
                        break
                    }
                }
                $scope.batches.splice(i, 1)
            });
        };

        $scope.applyFilters();

    }]);
});
