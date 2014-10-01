//Define an angular module for our app
var app = angular.module('myApp', ['angularCharts']);

app.controller('tasksController', function($scope, $window, $http) {
    console.log("APP JS called");
    $scope.chart = [];

    $scope.session1 = {};
    $scope.session1.val = "value";


  getTask(); // Load all available tasks 
  function getTask(){  
  $http.post("ajax/getTask.php").success(function(data){
        $scope.tasks = data;
       });
  };
  $scope.addTask = function (task) {
  console.log(task);
    $http.post("ajax/addTask.php?task="+task).success(function(data){
        getTask();
        $scope.taskInput = "";
      });
  };
  $scope.deleteTask = function (task) {
    if(confirm("Are you sure to delete this line?")){
    $http.post("ajax/deleteTask.php?taskID="+task).success(function(data){
        getTask();
      });
    }
  };

  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      $http.post("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data){
        getTask();
      });
  };


  $scope.addUser = function (user) {
      this.user.user = user.user;
      this.user.password = user.password;
        console.log(user);
        $http.post("ajax/addUser.php?user="+user.user+"&password="+user.password).success(function(data){
            $scope.user = user;
        });
    };


  $scope.getUser = function (user) {
      this.user.user = user.user;
      this.user.password = user.password;
        console.log(user);
        $http.post("ajax/getUser.php?user="+user.user+"&password="+user.password).success(function(data){
            $scope.users = data;
            console.log($scope.users[0].password);
            sharedScope.session.key = $scope.users[0].username;
            sharedScope.session.value = $scope.users[0].password;
            $scope.session1.key = $scope.users[0].username;
            $scope.session1.value = $scope.users[0].password;

            sharedScope.sessions.push(sharedScope.session);
            console.log("Hi "+ sharedScope.sessions[0].value);
            $scope.data1 = sharedScope.sessions[0].key;
            console.log("Hello "+$scope.data1 +" "+sharedScope.sessions.length);
            $scope.map = {};
            $scope.map.mappedWith = sharedScope.sessions.length-1;
            $scope.map.mappedBy = "user";
            sharedScope.mapper.push($scope.map);
            console.log(sharedScope.mapper[0].mappedWith);

        });
    };

    getIssue(); // Load all available tasks
    function getIssue(){
        $http.post("ajax/getIssue.php").success(function(data){
            $scope.issues = data;
            console.log($scope.issues);
        });

    };

    $scope.setIssueUpdate = function (issue) {
        console.log(issue);
        $http.post("ajax/updateIssue.php?"+"&update="+issue.update).success(function(data){
            console.log("I am here");
            $window.location.href = 'http://localhost/module_pattern/issueList.html';
            console.log("Hello again");
        });
    };

    $scope.getIssueUpdate = function (issue) {
        console.log(issue);
        $scope.issueupdates;
        issue.childrenVisible = !issue.childrenVisible;
        $http.post("ajax/getIssueUpdate.php?id="+issue.ID).success(function(data){
            $scope.issueupdates = data;
            console.log($scope.issueupdates);
        });
    };

    getIssueUpdateSession();
    function getIssueUpdateSession() {
        $http.post("ajax/getIssueUpdateSession.php").success(function (data) {
            $scope.issueviews = data;
            console.log($scope.issueviews);
        });
    };


    getUserList();
    function getUserList() {
        $http.post("ajax/getUserList.php").success(function (data) {
            $scope.userLists = data;
            console.log("USER LIST");
            console.log($scope.userLists);
        });
    };


    closeIssue();
    function closeIssue() {
        $http.post("ajax/getIssueUpdateSession.php").success(function (data) {
            $scope.closeissue = data;
            console.log($scope.closeissue);
        });
    };


});



app.controller("MainCtrl",function($scope, $http){
    $scope.chart = [];
    $scope.pdatas =[];
    //START
    $http.post("ajax/getIssueCharts.php").success(function(data){
        $scope.issueCharts = data;
        console.log("ISSUE CHARTS");
        console.log($scope.issueCharts);
        console.log("END ISSUE CHARTS");


        for(var i in $scope.issueCharts){
            var issueTask = $scope.issueCharts[i];
            console.log(issueTask);
            var issue = [];
            for(var j in issueTask){
                var child = {};
                child.x = j;
                child.y = [];
                child.y.push(parseInt(issueTask[j]));
                issue.push(child);
                child = {};
            }
            var pdata = {};
            pdata.data = issue;
            $scope.pdatas.push(pdata);
            console.log("PDATA");
            console.log(pdata);
            var strpdata = JSON.stringify(pdata,undefined,4);
            console.log(strpdata);
            console.log("END PDATA");
            console.log(issue);
            $scope.chart.push(issue);
        }
        console.log("CHART");
        console.log($scope.chart.length);

        var str = JSON.stringify($scope.chart,undefined,4);
        console.log(str);


    });

    //END




    $scope.config = {
        "labels": true,
        "title": "Task Distribution",
        "legend": {
            "display": true,
            "position": "right"
        },
        "innerRadius": "20",
        "lineLegend": "lineEnd"
    };
    $scope.datas = [];

    $scope.data = {
        data: [{
            x: "Laptops",
            y: [100],
            tooltip: "this is tooltip"
        }, {
            x: "Desktops",
            y: [300]
        }, {
            x: "Mobiles",
            y: [351]
        }, {
            x: "Tablets",
            y: [54]
        }]
    };
    $scope.datas.push($scope.data);
    $scope.data = {
        data: [{
            x: "Laptops",
            y: [100],
            tooltip: "this is tooltip"
        }, {
            x: "SORRY",
            y: [300]
        }, {
            x: "Mobiles",
            y: [351]
        }, {
            x: "Tablets",
            y: [54]
        }]
    };
    $scope.datas.push($scope.data);
    var str = JSON.stringify($scope.data,undefined,4);
    console.log(str);
    console.log($scope.data.data);

});


app.controller('myController', function($scope, $http, $window ){
    /*$scope.products = [
        {'name':'product1', 'selected': false},
        {'name':'product2', 'selected': false},
        {'name':'product4', 'selected': false}
    ];*/

    $scope.list = [ { value: 'value 1' }, { value: 'value 2' } ];


    getUserList();
    function getUserList() {
        $http.post("ajax/getUserList.php").success(function (data) {
            $scope.products = data;
            console.log("USER LIST");
            console.log($scope.products);
        });
    };


    $scope.selected_products = [];
    $scope.selected_value = [];
    $scope.add = function(prod){
        console.log("So the value is: "+prod.task+ " and "+ prod.username);
        //$scope.selected_value.push(prod.task);
        var index = $scope.selected_products.indexOf(prod.username);
        var TaskIndex = $scope.selected_value.indexOf(prod.task);
        console.log("Indexer: "+TaskIndex + " User: "+index);
        if(index > -1) {
            console.log("Seriously: "+index);
            //$scope.selected_value.splice(index, 0, prod.task);
            $scope.selected_value[index] = prod.task;
        }
        if(index == -1 && prod.selected){
            $scope.selected_products.push(prod.username);
            console.log("If "+prod.task);
            //$scope.selected_value.push(prod.task);
        } else if (!prod.selected && index != -1){
            console.log("Else If "+prod.task);
            $scope.selected_products.splice(index, 1);
            $scope.selected_value.splice(index, 0);
        }
    };


    $scope.getList = function(issue){
        for(var i in $scope.list){
            var value = $scope.list[i];
            console.log("THis is:" +value.value);
            //$scope.selected_value.push(value.value);
        }

        console.log("Got it");
        console.log($scope.selected_products);
        console.log($scope.list);
        console.log("Selected: "+$scope.selected_value);
        console.log(issue);
        $http.post("ajax/createIssue.php?name="+issue.name+"&date="+issue.date+"&description="+issue.description+"&list="+$scope.selected_products+"&value="+$scope.selected_value).success(function(data){
            $scope.createdIssue = data;
            console.log($scope.createdIssue);
            $window.location.href = 'http://localhost/module_pattern/issueList.html';
        });


    };
});