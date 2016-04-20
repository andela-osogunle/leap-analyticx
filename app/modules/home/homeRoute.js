'use strict';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('leap-analyticx')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider

			.state('home', {
				url: '',
				abstract: true,
				templateUrl: 'app/modules/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('home.viewCount', {
				url:'/viewcount',
				templateUrl: 'app/modules/home/viewCount.html',
				controller: 'ViewCountCtrl'

			})
			.state('home.dashboard', {
				url:'/dashboard',
				templateUrl: 'app/modules/home/dashboard.html',
				controller: 'ViewCountCtrl'

			})

			.state('home.timeSpent', {
				url:'/timeSpent',
				templateUrl: 'app/modules/home/timeSpent.html',
				controller: 'ViewCountCtrl'

			});

	}]);
