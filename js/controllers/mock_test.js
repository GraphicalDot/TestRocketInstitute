define(['./module', '../services/index', 'underscore', 'jquery'], function (controllers, services, _, $) {
    'use strict';
    controllers.controller('MockTestCtrl', ['$scope', '$state', '$sce', 'enums', '$timeout', 'Ontology', 'AvailableMockTest', 'Batches', function ($scope, $state, $sce, Enums, $timeout, Ontology, AvailableMockTest, Batches) {

        $scope.sce = $sce;
        $scope.Enums = Enums;
        $scope.error = {};

        var engineeringExams = ['1', '2', '3'];
        var medicalExams = ['4', '5'];
        if (engineeringExams.indexOf($state.params.target_exam) > -1)
            var compatibleExams = engineeringExams;
        if (medicalExams.indexOf($state.params.target_exam) > -1)
            var compatibleExams = medicalExams;

        showLoader();
        Ontology.list().$promise.then(function (data) {
            $scope.ontology = {};
            data.nodes.forEach(function (node) {
                $scope.ontology[node.id] = node;
            });
            Batches.list().$promise.then(function (bData) {
                $scope.batches = [];
                bData.batches.forEach(function(batch) {
                    if (compatibleExams.indexOf(batch.target_exam) > -1)
                        $scope.batches.push(batch);
                });
                AvailableMockTest.get({id: $state.params.id}).$promise.then(function (mData) {
                    $scope.mockTest = mData.mock_test;
                    $scope.pushed_batches_ids = {};
                    $scope.mockTest.batches_pushed_to.forEach(function (b) {
                        $scope.pushed_batches_ids[b.id] = true;
                    });
                    $scope.already_pushed_batch_ids = angular.copy($scope.pushed_batches_ids);
                    $scope.questions = {};
                    mData.questions.forEach(function (q) {
                        $scope.questions[q.id] = q;
                    });
                    $scope.subjects = [];
                    for (var sid in $scope.mockTest.question_ids) {
                        $scope.subjects[$scope.mockTest.question_ids[sid].order] = {
                            id: sid,
                            name: $scope.ontology[sid].name,
                            q_ids: $scope.mockTest.question_ids[sid].q_ids
                        };
                    }
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
        });

        $scope.push = function () {
            showLoader();
            var postData = {
                id: $scope.mockTest.id,
                batch_ids: Object.keys($scope.pushed_batches_ids).filter(function (id) {
                    return $scope.pushed_batches_ids[id] == true;
                }).join(',')
            };
            AvailableMockTest.push(postData).$promise.then(function (data) {
                window.history.back();
                hideLoader();
            });

        };

        $scope.cancel = function () {
            window.history.back();
        };

        $scope.selectedClass = Object.keys(Enums.BATCH_TYPE)[0];
        $scope.changeClass = function () {
            $scope.selectedClass = $('#clazz').val();
        };
    }]);
});