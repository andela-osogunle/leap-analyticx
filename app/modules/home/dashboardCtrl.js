// angular.module("home", ["chart.js"]).controller("DashboardCtrl", function ($scope) {
//
//   $scope.data = [[1, 2, 3, 4, 5, 6, 7, 8]];
//   $scope.labels = ['hoi', 'doei', 'hallo', 'hee', 'hoi', 'doei', 'hallo', 'hee',];
//   $scope.options = {
//     animation: false
//   };
//   $scope.legend = true;
// });

angular.module("home", ['ngMaterial','ngMessages'])

.controller("DashboardCtrl", function ($scope,$http,$window) {

    $scope.myVar = false;
    $scope.showViewCount = function(){
      $scope.myVar = !$scope.myVar;
    }
   $scope.myDate = new Date();
   $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() - 2,
      $scope.myDate.getDate());
   $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());
  //Hard coded data given to the course Items to be selected via check boxes
    $scope.items = [1,2,3,4,5];
      $scope.selected = [];
      $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else list.push(item);
      };
      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
      };

  // store response data in a variable
  var responsejson;
  var graphMainArr=[];
  var graphInnerArr=[];
  $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $http.defaults.headers.common['Content-Type'] = 'application/json';
  $http.defaults.headers.common['x-auth-token'] = $window.sessionStorage.Token;
  //console.log($window.sessionStorage.Token);
  $http.get("http://10.11.9.8/api/v1/analytics/viewcount?action=attempted&type=course")
  .then(function(response) {
    // store response data in a variable
    
    responsejson = response.data;
    //console.log(response.data);
    // var graphMainArr=[];
    // var graphInnerArr=[];
    //var columnArr=['Course Name','View Count'];
    // loop to delete CourseId property from the response object
    for( i = 0; i < responsejson.ResultData.length ; i++){
      delete responsejson.ResultData[i].CourseId;
    }

    /*
    *push static innner array in parent array , parent array is to be passed in google chart method for  data.
    */
    //graphMainArr.push(columnArr);

    // loop to fill parent or main array with the required innner data array elements.
    for(i = 0; i < responsejson.ResultData.length ; i++){
      graphInnerArr.push(responsejson.ResultData[i].CourseName);
      graphInnerArr.push(responsejson.ResultData[i].Total_times_attempted);

      graphMainArr.push(graphInnerArr);
      graphInnerArr=[];
      //console.log(graphMainArr);

    }
    $scope.chartObject = {};
    $scope.chartObject.type = "ColumnChart";

    $scope.onions = [
      {v: "Onions"},
      {v: 3},
    ];

    $scope.chartObject.data = {"cols": [
      {id: "t", label: "Topping", type: "string"},
      {id: "s", label: "Slices", type: "number"}
    ], "rows": [
      {c: [
        {v: "Mushrooms"},
        {v: 3},
      ]},
      {c: $scope.onions},
      {c: [
        {v: "Olives"},
        {v: 31}
      ]},
      {c: [
        {v: "Zucchini"},
        {v: 1},
      ]},
      {c: [
        {v: "Pepperoni"},
        {v: 2},
      ]}
    ]};

    $scope.chartObject.options = {
      'title': 'How Much Pizza I Ate Last Night'
    };
  });




  // google.charts.load('current', {'packages':['corechart']});
  // google.charts.setOnLoadCallback(drawChart);
  //
  // function drawChart() {
  //   // initialize or define array variables to convert json to  array
  //     var graphMainArr=[];
  //     var graphInnerArr=[];
  //     var columnArr=['Course Name','View Count'];
  //     // loop to delete CourseId property from the response object
  //     for( i = 0; i < responsejson.ResultData.length ; i++){
  //       delete responsejson.ResultData[i].CourseId;
  //     }
  //
  //     /*
  //      *push static innner array in parent array , parent array is to be passed in google chart method for  data.
  //     */
  //     graphMainArr.push(columnArr);
  //
  //     // loop to fill parent or main array with the required innner data array elements.
  //     for(i = 0; i < responsejson.ResultData.length ; i++){
  //         graphInnerArr.push(responsejson.ResultData[i].CourseName);
  //         graphInnerArr.push(responsejson.ResultData[i].Total_times_attempted);
  //
  //         graphMainArr.push(graphInnerArr);
  //         graphInnerArr=[];
  //
  //     }
  //
  //
  //   var data = google.visualization.arrayToDataTable(graphMainArr);
  //
  //   var options = {
  //     title: 'Leap Analyticx'
  //   };
  //
  //   var chart = new google.visualization.ColumnChart(document.getElementById('piechart'));
  //
  //   chart.draw(data, options);
  // }

});
