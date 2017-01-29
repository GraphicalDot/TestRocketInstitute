define(['./module', '../services/index', 'underscore', 'jquery'], function (controllers, services, _, $) {
    'use strict';
    controllers.controller('MockTestCtrl', ['$scope', '$state', '$sce', 'enums', '$timeout', 'Ontology', 'AvailableMockTest', 'Batches', function ($scope, $state, $sce, Enums, $timeout, Ontology, AvailableMockTest, Batches) {

        //TARGET_EXAMS = {'1': 'JEE Advanced', '2': 'JEE Mains', '3': 'BITSAT', '4': 'AIPMT', '5': 'AIIMS', '6': 'NTSE'}
        //Enums.BATCH_TYPE: {'1': 'Class 11', '2': 'Class 12', '3': 'Droppers', '4': 'Other'},
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
                //This api returns the list of all the batches created by this
                //institute bData = {"batches": batches}
                //                 id            | 1
                // name          | MyBatch
                // on_weekdays   | t
                // on_weekends   | f
                // clazz         | 
                // target_year   | 2015
                // type          | 1    
                // target_exam   | 1
                // other         | 
                // batch_timings | 10:0-11:0
                // institute_id  | 2
                // created_at    | 2017-01-28 20:30:42.240055
                // status        | 1

                $scope.batches = [];
                bData.batches.forEach(function(batch) {
                    if (compatibleExams.indexOf(batch.target_exam) > -1)
                        $scope.batches.push(batch);
                });

                console.log($scope.batches) //all the batches will be pushed to $scope.bacthes i think
                //$state.params.id is the id of the mock test on which push button has been clicked 
                // from the mock_test_list.html
                AvailableMockTest.get({id: $state.params.id}).$promise.then(function (mData) {
                    //response will have two keys "mock_test" and "questions"
                    // mock_test.batches_pushed_to = [{'id': b.id, 'name': b.name, 'class': b.clazz} for b in batches]
                    //above is copied from backend to show that key batches_pushed_to is an array 
                    // of objects all of which are batches to whom this mock test has already been pushed
                    // questions key is a list of questions with each entry being a question test and question id
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
                    console.log($scope.subjects)
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
               // window.history.back();
                $state.transitionTo("main.mock_tests");
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