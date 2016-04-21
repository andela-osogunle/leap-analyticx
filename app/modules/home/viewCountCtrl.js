angular.module("home", []).controller("ViewCountCtrl", function ($scope,$http,$window) {

  // store response data in a variable
  var responsejson;
  var graphMainArr=[];
  var graphInnerArr=[];
  $scope.courses = [1,2,3,4,5];
      $scope.selectedCourses = [];
      $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
      };
      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
      };

      $scope.users = [1,2,3,4,5];
      $scope.selectedUsers = [];
      $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
      };
      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
      };
      $scope.myDate = new Date();
  $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() - 2,
      $scope.myDate.getDate());
  $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());
  $scope.name="To be prepared";
  $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $http.defaults.headers.common['Content-Type'] = 'application/json';
  $http.defaults.headers.common['x-auth-token'] = $window.sessionStorage.Token;

  $http.get("http://10.11.9.8/api/v1/analytics/viewcount?action=attempted&type=course")
  .then(function(response) {

    // store response data in a variable
    responsejson = response.data;
  
    for( i = 0; i < responsejson.ResultData.length ; i++){
      delete responsejson.ResultData[i].CourseId;
      graphInnerArr.push({v: responsejson.ResultData[i].CourseName});
      graphInnerArr.push({v: responsejson.ResultData[i].Total_times_attempted});

      graphMainArr.push({c: graphInnerArr});
      graphInnerArr=[];
    }

    
   
    $scope.chartObject = {};
    $scope.chartObject.type = "ColumnChart";

    $scope.chartObject.data = {"cols": [
        {id: "t", label: "Course Name", type: "string"},
        {id: "s", label: "View Count", type: "number"}
    ], "rows": graphMainArr
    };

    $scope.chartObject.options = {
      'title': 'Graph '
    };
   


  });

});

