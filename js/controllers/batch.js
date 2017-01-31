define(['./module', '../services/index', 'underscore', 'jquery'], function (controllers, services, _, $) {
    'use strict';
    controllers.controller('BatchCtrl', ['$scope', '$state', 'enums', '$timeout', 'Batches', 'Batch', function (
        $scope, $state, Enums, $timeout, Batches, Batch) {

        $scope.Enums = Enums;
        $scope.error = {};

        $scope.initForm = function(data) {
            if (!data || Object.keys(data).length == 0) {
                var s = new Date();
                s.setHours(10);
                s.setMinutes(0);
                $scope.batch.start_time = s;
                var e = new Date();
                e.setHours(11);
                e.setMinutes(0);
                $scope.batch.end_time = e;
                //$scope.batch.clazz = '11';
                $scope.batch.target_year = '2015';
                $scope.batch.type = '1';
                $scope.batch.target_exam = '1';
            } else {
                var timings = $scope.batch.batch_timings.split('-');
                $scope.batch.start_time = new Date();
                var parts = timings[0].split(':');
                $scope.batch.start_time.setHours(parseInt(parts[0]));
                $scope.batch.start_time.setMinutes(parseInt(parts[1]));
                $scope.batch.end_time = new Date();
                var parts = timings[1].split(':');
                $scope.batch.end_time.setHours(parseInt(parts[0]));
                $scope.batch.end_time.setMinutes(parseInt(parts[1]));
            }
        };

        var validateForm = function() {
            if (!$scope.batch.name) {
                $scope.error.name = true;
                $scope.error.message = 'Enter a name';
                return false;
            }
            else
                $scope.error.name = false;

            if (!($scope.batch.on_weekdays || $scope.batch.on_weekends)) {
                $scope.error.days = true;
                $scope.error.message = 'Select weekdays or weekends or both.';
                return false
            }
            else
                $scope.error.days = false;

            /*if (!$scope.batch.clazz) {
                $scope.error.clazz = true;
                $scope.error.message = 'Select a class';
                return false;
            }
            else
                $scope.error.clazz = false;*/
	    delete $scope.batch.clazz;
            if (!$scope.batch.target_year) {
                $scope.error.target_year = true;
                $scope.error.message = 'Select an year';
                return false;
            }
            else
                $scope.error.target_year = false;

            if (!$scope.batch.type) {
                $scope.error.type = true;
                $scope.error.message = 'Select a type';
                return false;
            }
            else
                $scope.error.type = false;

            if (!$scope.batch.target_exam) {
                $scope.error.target_exam = true;
                $scope.error.message = 'Select an exam';
                return false;
            }
            else
                $scope.error.target_exam = false;

            if ($scope.batch.type == '4' && !$scope.batch.other) {
                $scope.error.other = true;
                $scope.error.message = 'Select other';
                return false;
            }
            else
                $scope.error.other = false;

            if (!$scope.batch.start_time) {
                $scope.error.start_time = true;
                $scope.error.message = 'Select a valid start time';
                return false;
            }
            else
                $scope.error.start_time = false;

            if (!$scope.batch.end_time) {
                $scope.error.end_time = true;
                $scope.error.message = 'Select a valid end time';
                return false;
            }
            else
                $scope.error.end_time = false;

            return true;
        };

        $scope.submit = function() {
            if (validateForm()) {
					 showLoader();
                var postData = angular.copy($scope.batch);
                postData.on_weekdays = $scope.batch.on_weekdays ? 1 : 0;
                postData.on_weekends = $scope.batch.on_weekends ? 1 : 0;
                postData.target_year = parseInt($scope.batch.target_year);
                postData.batch_timings = $scope.batch.start_time.getHours() + ':' + $scope.batch.start_time.getMinutes()
                + '-' + $scope.batch.end_time.getHours() + ':' + $scope.batch.end_time.getMinutes();
                    
                //If we are editing the existing batch, On batches_list.html
                //If we goign to click the edit button for a batch then this
                // COntroller will have a batch_id from the $state.params, This is just cheking if thats th e
                //the case, then it will make a post request on the esisting batch_id
                if ('id' in $scope.batch) {
                    postData.id = $scope.batch.id;
                    delete postData['status'];
                    Batch.update(postData).$promise.then(function(data) {
                        if (!data.error) {
                            $state.transitionTo("main.batches")
			    hideLoader();
                        } else {
                            $scope.error.name = true;
                            $scope.error.message = data.message;
                            console.log(data);
			    				    hideLoader();
                        }
                    });
                }

                //If the batch is newly created, then it will not have a batch_id yet
                 else {
                    Batches.create(postData).$promise.then(function(data) {
                        if (!data.error) {
                            $state.transitionTo("main.batches")
			    hideLoader();
                        } else {
                            $scope.error.name = true;
                            $scope.error.message = data.message;
                            console.log(data);
			    					 hideLoader();
                        }
                    }, function(resp) {
                        $scope.error.name = true;
                        $scope.error.message = resp.data.message;
                        console.log(resp.data);
								hideLoader();
                    });
                }
            }
            //console.log($scope.batch);
        };
	   //submit function logic completed

		  var styleChosen = function() {
            $timeout(function () {
                $(".chosen-select").chosen({
                    'width':'100%',
                    'white-space':'nowrap',
                    disable_search_threshold: 10
                });
            }, 100);
        };

        $scope.cancel = function() {
            window.history.back();
        };

        if ($state.params.id) {
            Batch.get({id: $state.params.id}).$promise.then(function(data) {
                $scope.batch = data.batch;
                $scope.initForm($scope.batch);
					 styleChosen();
                hideLoader();
            });
        }
        else {
            $scope.batch = {};
            $scope.initForm();
	    		styleChosen();
            hideLoader();
        }
    }]);
});