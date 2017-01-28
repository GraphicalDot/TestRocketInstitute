define(['./app'], function(app) {
    'use strict';
    return app.config(function($stateProvider) {
        $stateProvider.state('batches',{
            url: '/batches?days&type&target_year&branch',
            templateUrl: 'templates/batch_list.html',
            controller:'BatchListCtrl'
        });
        $stateProvider.state('batch',{
            url: '/batch?id',
            templateUrl: 'templates/batch.html',
            controller:'BatchCtrl'
        });
        $stateProvider.state('students',{
            url: '/students?batch_id&batch_type&target_year&branches&query&page&limit',
            templateUrl: 'templates/student_list.html',
            controller:'StudentListCtrl'
        });
        $stateProvider.state('student',{
            url: '/student?id',
            templateUrl: 'templates/student.html',
            controller:'StudentCtrl'
        });
        $stateProvider.state('mock_tests',{
            url: '/mock_tests?difficulty&batches_pushed_to&page&limit',
            templateUrl: 'templates/mock_test_list.html',
            controller:'MockTestListCtrl'
        });
        $stateProvider.state('mock_test',{
            url: '/mock_test?id&target_exam',
            templateUrl: 'templates/mock_test.html',
            controller:'MockTestCtrl'
        });
        $stateProvider.state('student_profile',{
            url: '/student_profile?id',
            templateUrl: 'templates/student_profile.html',
            controller:'StudentProfileCtrl'
        });
        $stateProvider.state('institute_analysis',{
            url: '/institute_analysis?target_exams&batches',
            templateUrl: 'templates/institute_analysis.html',
            controller:'InstituteAnalysisCtrl'
        })
        $stateProvider.state('institute_signin',{
            url: '/institute_signin',
            templateUrl: 'templates/institute_signin.html',
            controller:'InstituteSigninCtrl'
        })
        $stateProvider.state('main',{
            url: '/app',
            templateUrl: 'templates/main.html',
            controller:'MainCtrl'
        });
    })
});