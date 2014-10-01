myApp.controller('LoginController',['$scope', function($scope) {
    
    $scope.username;
    $scope.password;
    $scope.notificationMessage;
    
    var currentUser = Parse.User.current();
    
    if(currentUser){
        var query = (new Parse.Query(Parse.Role));
        query.equalTo("name", "Administrator");
        query.equalTo("users", currentUser); 
        query.first().then(function(adminRole) {
            if (adminRole) {
                parent.location='#main';
            } else {
                //
            }
        });
    }
    
    $scope.submitHandler = function(){
        Parse.User.logIn($scope.username, $scope.password, {
          success: function(user) {
              $scope.checkAuthorization();
              parent.location='#main';
            // Do stuff after successful login.
          },
          error: function(user, error) {
              Parse.User.logOut();
              $scope.notificationMessage = "Wrong username or password.";
              $scope.$apply();
            // The login failed. Check error to see why.
          }
        });
    }
    
    
    
}])