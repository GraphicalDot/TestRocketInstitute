define(['./module', '../services/index', 'underscore', 'jquery', 'store'], function (controllers, services, _, $, store) {
    'use strict';
    controllers.controller('InstituteSigninCtrl', ['$scope', '$state', 'enums', '$timeout', '$rootScope', '$http', function (
        $scope, $state, Enums, $timeout, $rootScope, $http) {

    		$scope.login = {}
    		 $scope.instituteLogin = function(){
                $scope.url = $rootScope.URL + "/institute_signin"
                var data = JSON.stringify($scope.login)
                console.log(data)
                
               	console.log($scope.url)
                $http.post($scope.url, data).then(function(response, status, headers, config){
                    //If the user credentials are true only then it will redirect to app
                    if(response.data.success == true){
                    var token = response.data.token;
                    var tokenParts = token.split('|');
                 
                    console.log(token)
                    console.log(tokenParts)
			        var user = {
          				  name: atob(tokenParts[3]),
            			id: parseInt(tokenParts[2]),
            				email: atob(tokenParts[0]),
            				password: tokenParts[1],
            			type: 'institute'
       				 };
                    store.set('ins_user', user);
                     $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa('institute' + '|' + user.id + ":" + user.password);
           				$state.transitionTo('main');
                    
                    }
                    else {
                        $scope.isloggedIn = true;
                    }              
                    
                        }, function(errResponse, satus,  headers, config){
                                console.log("Error Occurred" + response)

                        });



                                   
    	               }

}
])
})