'use strict';

/**
 * @ngdoc function
 * @name app.route:loginRoute
 * @description
 * # loginRoute
 * Route of the app
 */

angular.module('login')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('login', {
				url:'/login',
				templateUrl: 'app/modules/login/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'vm'
			});

		
	}]);
