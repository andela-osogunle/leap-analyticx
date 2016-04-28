(function () {
	'use strict';

	 angular
 		.module('leap-analyticx')
 		.controller('HomeCtrl', Home);

 	  Home.$inject = ['homeService','$scope'];


 	/*
 	 * recommend
 	 * Using function declarations
 	 * and bindable members up top.
 	 */

 	function Home(homeService, $scope) {
 		/*jshint validthis: true */
 		var vm = this;
 		//vm.title = "Hello, leap-analyticx!";
 		vm.version = "1.0.0";
 		vm.listFeatures = homeService.getFeaturesList();

 		$scope.pageTitle = "Manikant";

 	}

})();
