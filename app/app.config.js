(function () {
	'use strict';


	angular
		.module('leap-analyticx')
		.config(configure)
		.run(runBlock);
		

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider','$mdThemingProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,$mdThemingProvider) {
		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		 //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
        $mdThemingProvider.theme('default')
       .primaryPalette('teal')
        .accentPalette('blue');
        $mdThemingProvider.theme('input')
		$urlRouterProvider
				.otherwise('/login');

		//$locationProvider.hashPrefix('!');
   	}

	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {
		'use strict';

	}

})();
