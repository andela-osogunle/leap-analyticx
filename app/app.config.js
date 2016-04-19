(function () {
	'use strict';

	/**
	 * @ngdoc configuration file
	 * @name app.config:config
	 * @description
	 * # Config and run block
	 * Configutation of the app
	 */


	angular
		.module('leap-analyticx')
		.config(configure)
		.run(runBlock);
		

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		 //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';


		$urlRouterProvider
				.otherwise('/login');

		//$locationProvider.hashPrefix('!');




	}

	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {
		'use strict';

		// console.log('AngularJS run() function...');
	}


})();
