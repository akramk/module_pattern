myApp.controller('MainController',['$scope', function($scope) {
    
    $scope.authorized = false;
    $scope.userMessage = "Session Expire";
    $scope.tokenData;
    
    var currentUser = Parse.User.current();
    
    //this should be a module ? 
    if(currentUser){
        var query = (new Parse.Query(Parse.Role));
        query.equalTo("name", "Administrator");
        query.equalTo("users", currentUser); 
        query.first().then(function(adminRole) {
            if (adminRole) {
                $scope.authorized = true;
                $scope.userMessage = "Logged In as Administrator";
//                $scope.loadTokeData();
                $scope.$apply();
            } else {
                $scope.logoutHandler();
//                Parse.User.logOut();
                $scope.authorized = false;
                $scope.userMessage = "Sorry, you're not belongs here.";
                $scope.$apply();
            }
        });
    }else {
        $scope.logoutHandler();
    }
}]);