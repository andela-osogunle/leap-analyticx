angular.module('home', [])
       .controller('DashboardCtrl', function () {
if($http.defaults.headers.common['x-auth-token'] == 'null'){
    $window.location.href = '/#/login';
}       	
console.log("dashboard");
});