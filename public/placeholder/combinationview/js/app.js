
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

myApp.controller('CombinationController',function($scope,$location){
    $scope.combination = {};
	$scope.combination.layers = [];
	$scope.token = [];
	//?layer=2&objectId=xA9MR5J3Ss
//    console.log($location.search().objectId);
//	console.log($location.search().layer);
	$scope.currentAbsUrl = $location.absUrl();
//	console.log($location.absUrl());
//    $scope.token.objectId = $location.search().objectId;
	$scope.layerNumber = $location.search().layer;
    
    $scope.getData =function(){
    
    
    }
    
	$scope.setIncludeKeyCombinations = function(query){
		
		for(var i = 1 ; i <= 4 ; i ++){
			query.include('layer' + i + '.designer');	
			query.include('layer' + i + '.type');	
			query.include('layer' + i + '.color');	
			query.include('layer' + i + '.fabric');	
			query.include('layer' + i + '.pricerange');	
			query.include('layer' + i + '.season');	
			query.include('layer' + i + '.style');	
			query.include('layer' + i + '.supercategory');	
		}
		
	}
	
    var combination = Parse.Object.extend("PublicCombinations");
    var query = new Parse.Query(combination);
    
    query.equalTo("objectId", $location.search().objectId);
    $scope.setIncludeKeyCombinations(query);
	
//	  query.include('layer1');
//    query.include('layer2');
//    query.include('layer3');
//    query.include('layer4');
	
//    query.include('season');
//    query.include('style');
//    query.include('pricerange');
//    query.include('supercategory');
    query.first({
      success: function(object) {
//		  console.log(object.get('layer1'));
		  $scope.combination.imgUrl = object.get('image').url();
		  
		 $scope.combination.layers.push(object.get("layer1"));
		 $scope.combination.layers.push(object.get("layer2"));
		 $scope.combination.layers.push(object.get("layer3"));
		 $scope.combination.layers.push(object.get("layer4"));
        // Successfully retrieved the object.
//          console.log(object.get('name'));
//          $scope.token.name=object.get('name');
//          $scope.token.imgUrl = object.get('image').url();
//          $scope.token.desc = object.get('desc');
//          $scope.token.price = object.get('price');
//          $scope.token.productUrl = object.get('productUrl');
//          $scope.token.designer = object.get('designer').get('name');
//          $scope.token.type = object.get('type').get('name');
//          $scope.token.color = object.get('color').get('name');
//          $scope.token.fabric = object.get('fabric').get('name');
//          $scope.token.season = object.get('season').get('name');
//          $scope.token.style = object.get('style').get('name');
//          $scope.token.priceRange = object.get('pricerange').get('name');
//          $scope.token.superCategory = object.get('supercategory').get('name');
//          $scope.token.approved = object.get('approved')
//          console.log(object.get('designer').get('name'));
          $scope.$apply();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });    
    
    
    
    
})