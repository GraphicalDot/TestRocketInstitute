define(['./app'], function(app) {
    'use strict';
    return app.config(function($stateProvider) {
        $stateProvider

        .state('main',{
            url: '/app',
            templateUrl: 'templates/main.html',
            controller:'MainCtrl'
        })
        .state('main.batches',{
            url: '/batches?days&type&target_year&branch',
            templateUrl: 'templates/batch_list.html',
            controller:'BatchListCtrl'
        })
        .state('main.batch',{
            url: '/batch?id',
          templateUrl: 'templates/batch.html',
            controller:'BatchCtrl'
        })
        .state('main.students',{
            url: '/students?batch_id&batch_type&target_year&branches&query&page&limit',
            templateUrl: 'templates/student_list.html',
            controller:'StudentListCtrl'
        })
        .state('main.student',{
            url: '/student?id',
            templateUrl: 'templates/student.html',
            controller:'StudentCtrl'
        })
        .state('main.mock_tests',{
            url: '/mock_tests?difficulty&batches_pushed_to&page&limit',
            templateUrl: 'templates/mock_test_list.html',
            controller:'MockTestListCtrl'
        })
        .state('main.mock_test',{
            url: '/mock_test?id&target_exam',
            templateUrl: 'templates/mock_test.html',
            controller:'MockTestCtrl'
        })
        .state('main.student_profile',{
            url: '/student_profile?id',
            templateUrl: 'templates/student_profile.html',
            controller:'StudentProfileCtrl'
        })
        .state('main.institute_analysis',{
            url: '/institute_analysis?target_exams&batches',
            templateUrl: 'templates/institute_analysis.html',
            controller:'InstituteAnalysisCtrl'
        })
        .state('institute_signin',{
            url: '/institute_signin',
            templateUrl: 'templates/institute_signin.html',
            controller:'InstituteSigninCtrl'
        })
        
    })
});