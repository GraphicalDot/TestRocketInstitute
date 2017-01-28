define(['./module', '../services/index', 'underscore', 'jquery'], function (controllers, services, _, $) {
    'use strict';
    controllers.controller('StudentCtrl', ['$scope', '$state', 'enums', '$timeout', 'Students', 'Student', 'Batches', function ($scope, $state, Enums, $timeout, Students, Student, Batches) {

        $scope.Enums = Enums;
        $scope.error = {};

        var validateForm = function () {
            if (!$scope.student.name) {
                $scope.error.name = true;
                $scope.error.message = 'Enter a name';
                return false;
            }
            else
                $scope.error.name = false;

            if (!$scope.student.email || $scope.student.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/)==null) {
                $scope.error.email = true;
                $scope.error.message = "Enter a valid email";
                return false;
            }
            else
                $scope.error.email = false;

            if (!$scope.student.password && !$scope.student.id) {
                $scope.error.password = true;
                $scope.error.message = "Enter password";
                return false;
            }
            else
                $scope.error.password = false;

            if (!$scope.student.mobile_no || $scope.student.mobile_no.match(/[0-9]{10}/)==null) {
                $scope.error.mobile_no = true;
                $scope.error.message = "Enter a valid mobile no of 10 digits";
                return false;
            }
            else
                $scope.error.mobile_no = false;

            if (!$scope.student.roll_no) {
                $scope.error.roll_no = true;
                $scope.error.message = "Enter roll no";
                return false;
            }
            else
                $scope.error.roll_no = false;

            // in some browsers the student.batch_ids is not populated so use jquery selector
            if ($scope.student.batch_ids && $scope.student.batch_ids.length == 0)
                $scope.student.batch_ids = $('#batch_ids').val();
            if (!$scope.student.batch_ids || $scope.student.batch_ids.length == 0) {
                $scope.error.batch_ids = true;
                $scope.error.message = "Select at least one batch";
                return false;
            }
            else
                $scope.error.batch_ids = false;

            if ($scope.student.father_mobile_no && $scope.student.father_mobile_no.match(/[0-9]{10}/)==null) {
                $scope.error.father_mobile_no = true;
                $scope.error.message = "Enter a valid mobile no of 10 digits";
                return false;
            }
            if ($scope.student.father_email && $scope.student.father_email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/)==null) {
                $scope.error.father_email = true;
                $scope.error.message = "Enter a valid email";
                return false;
            }

            for (var k in $scope.student) {
                if ($scope.student[k] == null)
                    delete $scope.student[k];
            }

            return true;
        };

        $scope.submit = function (addAnother) {
            if (validateForm()) {
                showLoader();
                var postData = angular.copy($scope.student);
                postData.batch_ids = $scope.student.batch_ids.join(',');
                if ('id' in $scope.student) {
                    postData.id = $scope.student.id;
                    Student.update(postData).$promise.then(function (data) {
                        if (addAnother) {
                            $scope.student = {
                                batch_ids: []
                            };
                            $(".chosen-select").val('').trigger("chosen:updated");
                        }
                        else
                            window.history.back();
                        hideLoader();
                    });
                } else {
                    Students.create(postData).$promise.then(function (data) {
                        if (addAnother) {
                            $scope.student = {
                                batch_ids: []
                            };
                            $(".chosen-select").val('').trigger("chosen:updated");
                        }
                        else
                            window.history.back();
                        hideLoader();
                    }, function (resp) {
                        hideLoader();
                        if (resp.data.error) {
                            if (resp.data.code == 1101)
                                $scope.error.email = true;
                            if (resp.data.code == 1102)
                                $scope.error.mobile_no = true;
                            $scope.error.message = resp.data.message;
                            console.log(resp.data);
                        }
                    });
                }
            }
            //console.log($scope.batch);
        };

        $scope.cancel = function () {
            window.history.back();
        };

        var styleChosen = function () {
            $timeout(function () {
                $(".chosen-select").chosen({
                    'width': '100%',
                    'white-space': 'nowrap',
                    disable_search_threshold: 10
                });
            }, 200);
        };

        if ($state.params.id) {
            var batchList = Batches.list($scope.filters);
            batchList.$promise.then(function (data) {
                $scope.batches = data.batches;
                Student.get({id: $state.params.id}).$promise.then(function (data) {
                    $scope.student = data.student;
                    $scope.student.batch_ids = data.student.batches.map(function (batch) {
                        return batch.id;
                    });
                    styleChosen();
                    hideLoader();
                });
            });
        }
        else {
            var batchList = Batches.list($scope.filters);
            batchList.$promise.then(function (data) {
                $scope.batches = data.batches;
                $scope.student = {
                    batch_ids: []
                };
                styleChosen();
                hideLoader();
            });
        }

    }]);
});