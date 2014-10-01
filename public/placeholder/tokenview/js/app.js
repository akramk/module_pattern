
//Split controller into module
var myApp = angular.module('myApp', []);
setTimeout(function(){
	var loopVideo = document.getElementById("video-loop");
    loopVideo.play();
},2000);

//var loopVideo = document.getElementById("video-loop");
//loopVideo.play();

myApp.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});

myApp.controller('TokenController',function($scope,$location){
    $scope.token = {};
	//?layer=2&objectId=xA9MR5J3Ss
//    console.log($location.search().objectId);
//	console.log($location.search().layer);
	$scope.currentAbsUrl = $location.absUrl();
//	console.log($location.absUrl());
    $scope.token.objectId = $location.search().objectId;
	$scope.layerNumber = $location.search().layer;
    
    $scope.getData =function(){
    
    
    }
    
    var tokens = Parse.Object.extend("MyTokens_Layer" + $scope.layerNumber);
    var query = new Parse.Query(tokens);
    
    query.equalTo("objectId", $location.search().objectId);
    query.include('designer');
    query.include('type');
    query.include('color');
    query.include('fabric');
    query.include('season');
    query.include('style');
    query.include('pricerange');
    query.include('supercategory');
    query.first({
      success: function(object) {
        // Successfully retrieved the object.
          console.log(object.get('name'));
          $scope.token.name=object.get('name');
          $scope.token.imgUrl = object.get('image').url();
          $scope.token.desc = object.get('desc');
          $scope.token.price = object.get('price');
          $scope.token.productUrl = object.get('productUrl');
          $scope.token.designer = object.get('designer').get('name');
          $scope.token.type = object.get('type').get('name');
          $scope.token.color = object.get('color').get('name');
          $scope.token.fabric = object.get('fabric').get('name');
          $scope.token.season = object.get('season').get('name');
          $scope.token.style = object.get('style').get('name');
          $scope.token.priceRange = object.get('pricerange').get('name');
          $scope.token.superCategory = object.get('supercategory').get('name');
          $scope.token.approved = object.get('approved')
          console.log(object.get('designer').get('name'));
          $scope.$apply();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });    
    
    
    
    
})