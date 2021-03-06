(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.controller:LayoutCtrl
	 * @description
	 * # LayoutCtrl
	 * Controller of the app
	 */

	angular
		.module('leap-analyticx')
		.controller('LayoutCtrl', Layout);
		/*function loginMgr($scope, $window, $http, authService){
         
		};*/
   
	Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog','$window', '$http','$location'];

	/*
	 * recommend
	 * Using function declarations
	 * and bindable members up top.
	 */

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog, $window, $http,$location ) {

	$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $http.defaults.headers.common['Content-Type'] = 'application/json';
    $http.defaults.headers.common['x-auth-token'] = $window.sessionStorage.Token;
		// console.log("dsjfhddddddd",$window);
		/*jshint validthis: true */
		var vm = this;

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.changePassword = function () {
			$mdToast.show(
				$mdToast.simple()
					.content('Password clicked!')
					.position('top right')
					.hideDelay(2000)
			);
		};

		vm.changeProfile = function (ev) {
				$mdDialog.show({
					controller: DialogController,
					templateUrl: 'tabDialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true
				})
				.then(function(answer) {
					$mdToast.show(
						$mdToast.simple()
							.content('You said the information was "' + answer + '".')
							.position('top right')
							.hideDelay(2000)
					);

				}, function() {
					$mdToast.show(
						$mdToast.simple()
							.content('You cancelled the dialog.')
							.position('top right')
							.hideDelay(2000)
					);
				});

				function DialogController($scope, $mdDialog) {
					$scope.hide = function() {
						$mdDialog.hide();
					};

					$scope.cancel = function() {
						$mdDialog.cancel();
					};

					$scope.answer = function(answer) {
						$mdDialog.hide(answer);
					};
				}
		};


		vm.logOut = function () {
			$window.sessionStorage.Token=null;
			$window.location.href = '/#/login';
        };

		var originatorEv;
		vm.openMenu = function ($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};

	}

})();
