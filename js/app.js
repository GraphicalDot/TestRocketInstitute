'use strict';

define([
    'angular',
    'store',
    'ui-router',
    'ng-resource',
    'angular-bootstrap',
    'angular-youtube-embed',
    'highcharts-ng',
    //'chosen-ng',
    './controllers/index',
    './services/index',
    './filters/index'
], function (ng, store) {
    'use strict';

    var app = ng.module('app', [
        'app.filters',
        'app.services',
        'app.controllers',
        'ui.router',
        'ngResource',
        'ui.bootstrap',
        'youtube-embed',
        'highcharts-ng',
        //'localytics.directives'
    ]).controller('AppCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
            $rootScope.logout = function(){
                store.remove('ins_user');
                $state.transitionTo('institute_signin');
            };
            $rootScope.URL = "http://localhost:8080"

            $rootScope.state = $state;
        }])
        /*.directive('chosen', function($timeout) {

            var linker = function(scope, element, attr) {

                $timeout(function () {
                    element.chosen({
                        'width': '100%',
                        'white-space': 'nowrap',
                        disable_search: true
                    });
                }, 0, false);
            };

            return {
                restrict: 'A',
                link: linker
            };
        })*/
        .run(['$rootScope', '$state', '$http', function($rootScope, $state, $http) {
             $('.dropdown-toggle').dropdown()
            $rootScope.$on('$stateChangeSuccess', 
                    function(event, toState, toParams, fromState, fromParams){ 
                          $('.dropdown-toggle').dropdown()

                     }
            );
            var user = store.get("ins_user")
            //console.log(user);
            if (user == undefined ){
                    $state.transitionTo('institute_signin')
                }
            else if (user.type != "institute") {
                    $state.transitionTo('institute_signin')
            }
            else{
                    $rootScope.user = store.get('ins_user');
                    console.log("From run app.js" + user)
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('institute' + '|' + $rootScope.user.id + ":" + $rootScope.user.password);
            
                $state.transitionTo('main');
            }

            $rootScope.$on('$stateChangeStart',function(){
                    $rootScope.stateIsLoading = true;
            });

            $rootScope.$on('$stateChangeSuccess',function(){
                    $rootScope.stateIsLoading = false;
            });
            
            }]);
    return app;
});