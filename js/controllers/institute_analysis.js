define(['./module', '../services/index', 'underscore'], function (controllers, services, _) {
    'use strict';
    controllers.controller('InstituteAnalysisCtrl', ['$scope', '$state', 'enums', '$timeout', 'Batches', 'InstituteAnalysis', function ($scope, $state, Enums, $timeout, Batches, InstituteAnalysis) {
        $scope.Enums = Enums;

        if ($state.params.batches instanceof Array)
            $state.params.batches = $state.params.batches.map(function(b) {return parseInt(b);});
        if ($state.params.batches instanceof String || typeof($state.params.batches) === 'string')
            $state.params.batches = [parseInt($state.params.batches)];

        /*if ($state.params.target_exams instanceof Array)
            $state.params.target_exams = $state.params.target_exams.map(function(b) {return parseInt(b);});
        if ($state.params.target_exams instanceof String || typeof($state.params.target_exams) === 'string')
            $state.params.target_exams = [parseInt($state.params.target_exams)];*/

        $scope.filters = {
            target_exams: $state.params.target_exams,
            batches: $state.params.batches
        };

        $scope.applyFilters = function() {
            showLoader();
            var batchList = Batches.list($scope.filters);
            batchList.$promise.then(function (bData) {
                $scope.batches = bData.batches;
                var filterData = angular.copy($scope.filters);
                if (filterData.batches instanceof Array)
                    filterData.batches = filterData.batches.join(',');
                if (filterData.target_exams instanceof Array)
                    filterData.target_exams = filterData.target_exams.join(',');
                for (var key in filterData) {
                    if (!filterData[key])
                    delete filterData[key];
                }
                InstituteAnalysis.get(filterData).$promise.then(function (data) {
                    $scope.topStudents = _.sortBy(data.top_students, function(s) {return -s.score;});
                    $scope.bottomStudents = _.sortBy(data.bottom_students, function(s) {return s.score;});
                    $scope.topTopics = _.sortBy(data.top_topics, function(t) {return -t.accuracy;});
                    $scope.bottomTopics = _.sortBy(data.bottom_topics, function(t) {return t.accuracy;});
                    $scope.topTopicsBySubject = {};
                    $scope.bottomTopicsBySubject = {};
                    $scope.topSubjectNames = {};
                    $scope.bottomSubjectNames = {};

                    for (var subjectId in data.top_topics_by_subjects) {
                        if (!(subjectId in $scope.topSubjectNames)) {
                            $scope.topSubjectNames[subjectId] = data.top_topics_by_subjects[subjectId][0].subject_name;
                        }
                        $scope.topTopicsBySubject[subjectId] = _.sortBy(data.top_topics_by_subjects[subjectId], function(t) {return -t.accuracy;});
                    }

                    for (var subjectId in data.bottom_topics_by_subjects) {
                        if (data.bottom_topics_by_subjects[subjectId].length < 1)
                            continue;
                        if (!(subjectId in $scope.bottomSubjectNames)) {
                            $scope.bottomSubjectNames[subjectId] = data.bottom_topics_by_subjects[subjectId][0].subject_name;
                        }
                        $scope.bottomTopicsBySubject[subjectId] = _.sortBy(data.bottom_topics_by_subjects[subjectId], function(t) {return t.accuracy;});
                    }

                    $scope.selectedSubject = 0;

                    $scope.topTopicChanged = function() {
                        console.log('subject changed');
                    };

                    $timeout(function () {
                        $(".chosen-select").chosen({
                            'width':'100%',
                            'white-space':'nowrap',
                            disable_search_threshold: 10
                        });
                    }, 200);
                    $scope.analysisPresent = true;
                    if (($scope.topStudents.length + $scope.bottomStudents.length + $scope.topTopics.length + $scope.bottomTopics.length) == 0)
                        $scope.analysisPresent = false;
                    hideLoader();
                });
            });
        };

        $scope.filtersChange = function() {
            for (var f in $scope.filters) {
                if ($scope.filters[f] == '0') {
                    delete $scope.filters[f];
                }
            }
            $state.transitionTo('institute_analysis', $scope.filters);
        };

        $scope.applyFilters();
    }])
});