angular.module("home", []).controller("ViewCountCtrl", function ($scope,$http,$window,$element) {

  // store response data in a variable
  var responsejson;
  var graphMainArr=[];
  var graphInnerArr=[];

  var courseObjectList = [];
  var userObjectList = [];

  var tempSelectedCourse = [];
  var tempSelectedUser = [];


  $scope.myDate = new Date();
  $scope.minDate = new Date(
    $scope.myDate.getFullYear(),
    $scope.myDate.getMonth() - 2,
    $scope.myDate.getDate());
    $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());

      $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      $http.defaults.headers.common['Content-Type'] = 'application/json';
      $http.defaults.headers.common['x-auth-token'] = $window.sessionStorage.Token;

      //$scope.courses = ['C1' ,'C2' ,'C3' ,'C4' ,'C5', 'C6'];
      $http.get("http://10.11.9.8/api/v1/courses?pageNo=1&rpp=500")
      .then(function(response) {

        var courseData = response.data.courses;

        //console.log(courseData);
        for( i = 0; i < courseData.length ; i++){

          courseObjectList[i] = {"title":courseData[i].title,
          "id":courseData[i].id,
          "description":courseData[i].description,
          "durationType":courseData[i].durationType};

        }

        //console.log(courseObjectList);

        $scope.courses = courseObjectList;
        $scope.searchTerm;
        $scope.clearSearchTerm = function() {
          $scope.searchTerm = '';
        };

      });

      $http.get("http://10.11.9.8/api/v1/users?pageNo=1&rpp=500")
      .then(function(response) {

        var userData = response.data.users;

        //console.log(userData);
        for( i = 0; i < userData.length ; i++){

          userObjectList[i] = {"name":userData[i].name,
          "id":userData[i].id,
          "username":userData[i].userName,
          "email":userData[i].email};




        }
        //console.log(userObjectList);
        $scope.users = userObjectList;
        $scope.searchTerm;
        $scope.clearSearchTerm = function() {
          $scope.searchTerm = '';
        };

      });

      $scope.onCourseSelectValueChange = function(item){
        // for (prop in item){
        //   console.log(item[prop]);
        // }

        tempSelectedCourse = item;
      }

      $scope.onUserSelectValueChange = function(item){
        // for (prop in item){
        //   console.log(item[prop]);
        // }
        tempSelectedUser = item;
      }

      $scope.submit = function(){
        var courseIdArr = [];
        var userIdArr = [];
        //var selectedIndex = mg-courseSelector
        //console.log(courseObjectList);
        //console.log(" submit ;;;; "+tempSelectedCourse[0].id);
        for( i = 0; i < tempSelectedCourse.length ; i++){

          courseIdArr.push(tempSelectedCourse[i].id);

        }
        //console.log(courseIdArr);

        for( j = 0; j < tempSelectedUser.length ; j++){

          userIdArr.push(tempSelectedUser[j].id);
        }

        if(courseIdArr.length > 0 && userIdArr.length ==0 ){
          $http.get("http://10.11.9.8/api/v1/analytics/viewcount?action=attempted&type=course&id="+courseIdArr)
          .then(function(response) {
            var responseCourse;
            var courseGraphArr = [];
            // store response data in a variable
            responseCourse = response.data;
            console.log(responseCourse);
            if(responseCourse.ResultData.length >0){
             // console.log("No data found");
            for( i = 0; i < responseCourse.ResultData.length ; i++){
               
              delete responseCourse.ResultData[i].CourseId;

              courseGraphArr.push({c: [{v: responseCourse.ResultData[i].CourseName},{v: responseCourse.ResultData[i].Total_times_attempted}]});
            }
          }


            //console.log(courseGraphArr);
            $scope.chartObject = {};
            $scope.chartObject.type = "ColumnChart";

            $scope.chartObject.data = {"cols": [
              {id: "t", label: "Course Name", type: "string"},
              {id: "s", label: "View Count", type: "number"}
            ], "rows": courseGraphArr
          };


          $scope.chartObject.options = {
            'title': 'Graph',
            'vAxis': {
              'title': 'View Count',
              logScale:true,
              'gridlines': {
                'count': 10
              }
            },
            'hAxis': {
              'title': 'Courses',

            }
          };



        });
        }

        else if(courseIdArr.length > 0 && userIdArr.length > 0){

          $http.get("http://10.11.9.8/api/v1/analytics/viewcount?action=attempted&type=course&id="+courseIdArr+"&users="+userIdArr)
          .then(function(response) {
            var responseUser;
            var userGraphArr = [];
            // store response data in a variable

            responseUser = response.data;
            console.log(responseUser);
            if(responseUser.ResultData.length>0){
            for( i = 0; i < responseUser.ResultData.length ; i++){
              delete responseUser.ResultData[i].CourseId;
              delete responseUser.ResultData[i].UsersAttempt[0].userId;
              userGraphArr.push({c: [{v: responseUser.ResultData[i].CourseName},{v: responseUser.ResultData[i].UsersAttempt[0].Total_times_attempted}]});
            }}


            //console.log(courseGraphArr);
            $scope.chartObject = {};
            $scope.chartObject.type = "ColumnChart";

            $scope.chartObject.data = {"cols": [
              {id: "t", label: "Course Name", type: "string"},
              {id: "s", label: "View Count", type: "number"}
            ], "rows": userGraphArr
          };


          $scope.chartObject.options = {
            'title': 'Graph',
            'vAxis': {
              'title': 'View Count',
              logScale:true,
              'gridlines': {
                'count': 10
              }
            },
            'hAxis': {
              'title': 'Courses',

            }
          };



        });
        }



       else if(userIdArr ){

          $http.get("http://10.11.9.8/api/v1/analytics/viewcount?action=attempted&type=course&users="+userIdArr)
          .then(function(response) {
            var responseUser;
            var userGraphArr = [];
            // store response data in a variable

            responseUser = response.data;
            console.log(responseUser);
            if(responseUser.ResultData.length>0){
            for( i = 0; i < responseUser.ResultData.length ; i++){
              delete responseUser.ResultData[i].CourseId;
              delete responseUser.ResultData[i].UsersAttempt[0].userId;
              userGraphArr.push({c: [{v: responseUser.ResultData[i].CourseName},{v: responseUser.ResultData[i].UsersAttempt[0].Total_times_attempted}]});
            }}


            //console.log(courseGraphArr);
            $scope.chartObject = {};
            $scope.chartObject.type = "ColumnChart";

            $scope.chartObject.data = {"cols": [
              {id: "t", label: "Course Name", type: "string"},
              {id: "s", label: "View Count", type: "number"}
            ], "rows": userGraphArr
          };


          $scope.chartObject.options = {
            'title': 'Graph',
            'vAxis': {
              'title': 'View Count',
              logScale:true,
              'gridlines': {
                'count': 10
              }
            },
            'hAxis': {
              'title': 'Courses',

            }
          };



        });
        }


      }
      // The md-select directive eats keydown events for some quick select
      // logic. Since we have a search input here, we don't need that logic.
      $element.find('input').on('keydown', function(ev) {
        ev.stopPropagation();
      });



      // The md-select directive eats keydown events for some quick select
      // logic. Since we have a search input here, we don't need that logic.
      $element.find('input').on('keydown', function(ev) {
        ev.stopPropagation();
      });
      $scope.name="To be prepared";


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
        'title': 'Graph',
        'vAxis': {
          'title': 'View Count',
          logScale:true,
          'gridlines': {
            'count': 10
          }
        },
        'hAxis': {
          'title': 'Courses',

        }
      };



    });

  });
