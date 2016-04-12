(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:loginCtrl
	* @description
	* # loginCtrl
	* Controller of the app
	*/

  	angular
		.module('login')

		//.controller('LoginCtrl', '$http'  , '$scope');.
// 		.controller("LoginCtrl", ["$scope","$http", function($scope,$http) {
//
//
// 				$scope.login = function(){
// 					// Simple GET request example:
//
// $http({
//   method: 'GET',
//   url: 'http://10.11.9.8/api/v1/login'
//
// }).then(function successCallback(response) {
// 	console.log(response);
//     // this callback will be called asynchronously
//     // when the response is available
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });
// 				};
//     }]);
.controller('LoginCtrl',
		function LoginCtrl($scope, $window, $http, authService, utilityservice, leapconfig) {
		    $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		    $scope.username = '';
		    $scope.password = '';
		    $scope.hasError = false;
		    $scope.errorMsg = '';
		    $scope.Name = '';
		    $scope.dataLoading = false;


		    // Login functionality for user
		    $scope.login = function () {


		        if (utilityservice.IsNullOrEmpty($scope.username)) {
		            $scope.userHide = false;
		        }
		        if (utilityservice.IsNullOrEmpty($scope.password)) {
		            $scope.pwdHide = false;
		        }
		        if (!utilityservice.IsNullOrEmpty($scope.username) && !utilityservice.IsNullOrEmpty($scope.password)) {
		            authService.login(angular.lowercase($scope.username), $scope.password).then(function (data) {

		                if (!data) {
		                    $scope.errorMsg = "Username or passsord is incorrect!";
		                    $scope.dataLoading = false;
		                    return;
		                }
		                var roles = data.roles;
		                var image = data.image;
		                if (angular.isDefined(image)) {
		                    $window.sessionStorage["userImage"] = image.src;
		                }
		                var metaDataMap = data.metaDataMap;
		                if (angular.isDefined(metaDataMap)) {
		                    $window.sessionStorage["MB_USER_TOKEN"] = metaDataMap.MB_USER_TOKEN;
                        }
		                $window.sessionStorage["leapLaunchedUser"] = false;
		                $window.sessionStorage["UserName"] = data.userName;
		                $window.sessionStorage["email"] = data.email;
		                $window.sessionStorage["UserId"] = data.id;
		                if (angular.isDefined(roles)) {
		                    var role = roles[0].title;
		                    $window.sessionStorage["Role"] = role;
		                    if (role) {
		                        if (angular.uppercase(role) === 'ADMIN') {
		                            $scope.hasError = false;
		                            $scope.errorMsg = '';
																//alert("login successfull");
		                            //$(location).attr('href', "/app/modules/home/dashboard.html");

		                        }
		                        else if (angular.uppercase(role) === 'LEARNER') {
		                            $(location).attr('href', "/leap/#/dashboard.html");
		                        }
		                    }
		                }
		            }, function (error) {
		                $scope.username = '';
		                $scope.password = '';
		                $scope.hasError = true;
		                $scope.errorMsg = "Username or passsord is incorrect!";
		                $scope.dataLoading = false;
										alert("login unsuccessfull");
		                return;
		            }
                   );
		        }
		    };
		})

		.factory('leapconfig', function () {
		    return {
		        //ServiceBaseUrl: 'http://121.241.115.117/api/',
		        ServiceBaseUrl: 'http://leap.stg.magicsw.com/api/',
		        LoginUrl: "v1/login",
		        Logout: "v1/logout"
		    };
		})

		 .factory('utilityservice', function () {
		     var factory = {};

		     factory.IsNullOrEmpty = function (data) {
		         if (data === null || data === 'undefined' || data === '') {
		             return true;
		         }
		         return false;
		     };

		     return factory;
		 })

		.factory('authService', function ($http, $rootScope, $window, $q, leapconfig, utilityservice) {
		    return {
		        login: function (userName, password) {
		            var deferred = $q.defer();
		            var loginUrl = leapconfig.ServiceBaseUrl + leapconfig.LoginUrl;
		            $window.sessionStorage["BasicAuth"] = 'Basic ' + window.btoa(userName + ":" + password);
		            $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		            $http.defaults.headers.common.Authorization = 'Basic ' + window.btoa(userName + ":" + password);
		            $http({
		                method: 'GET',
		                url: loginUrl
		                //,headers: { 'X-Requested-With': 'XMLHttpRequest' }
		            }).then(function (response) {
		                $window.sessionStorage["Token"] = response.headers('x-auth-token');
		                deferred.resolve(response.data);
										console.log(response.data);
		            }, function (error) {
		                deferred.reject(error);
		            });
		            return deferred.promise;
		        },
		        logout: function (userName, password) {
		            var deferred = $q.defer();
		            var logoutUrl = leapconfig.ServiceBaseUrl + leapconfig.Logout;
		            $http.get(logoutUrl).then(function (response) {
		                $window.sessionStorage["BasicAuth"] = null;
		                $window.sessionStorage["Token"] = null;
		                deferred.resolve(response.data);
		            }, function (error) {
		                deferred.reject(error);
		            });
		            return deferred.promise;
		        }
		    };
		}).directive('ngEnter', function () {
		    return function (scope, element, attrs) {
		        element.bind("keydown keypress", function (event) {
		            if (event.which === 13) {
		                scope.$apply(function () {
		                    scope.$eval(attrs.ngEnter);
		                });

		                event.preventDefault();
		            }
		        });
		    };
		});
// 		function LoginCtrl($http,$scope){
// 			$scope.login = function(){
// 	alert("clicked");
//
// };
// }


		//Login.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		// function Login() {
		// 	/*jshint validthis: true */
		//
		//
		// }

})();
