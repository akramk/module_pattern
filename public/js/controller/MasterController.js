//global controller for all other controller
myApp.controller('MasterController',function($scope,$modal){
    
    console.log("Master Controller has been called");
    $scope.currentUserName;
//    $scope.doAuthorization = true;
    
    $scope.logoutHandler = function(){
        Parse.User.logOut();
//        $scope.doAuthorization = false;
        parent.location='';
    }
    
    $scope.clearOptions = function(){
        $scope.designerOptions =[];
        $scope.typeOptions = [];
        $scope.colorOptions = [];
        $scope.fabricOptions = [];
        $scope.seasonOptions = [];
        $scope.styleOptions = [];
        $scope.priceRangeOptions = [];
        $scope.superCategoryOptions =[];
    }
    
    $scope.checkAuthorization = function(){
        var currentUser = Parse.User.current();
        if(currentUser){
            var query = (new Parse.Query(Parse.Role));
            query.equalTo("name", "Administrator");
            query.equalTo("users", currentUser); 
            query.first().then(function(adminRole) {
                if (!adminRole) {
//                    $scope.logoutHandler();
                } else {
//                    $scope.clearOptions();
                    console.log("load options");
                    $scope.loadCategories("all");
                    $scope.loadSuperCategories("all");
                    $scope.currentUserName = currentUser.get("username");
//                    console.log($scope.currentUser);
                    $scope.$apply();
                }
            });
        }else{
//            $scope.logoutHandler();
        }
    }
//    console.log($scope.doAuthorization);
    $scope.checkAuthorization();
//    if($scope.doAuthorization){
//        $scope.checkAuthorization();
//    }
//Super test 
    $scope.designerOptions =[];
    $scope.typeOptions = [];
    $scope.colorOptions = [];
    $scope.fabricOptions = [];
    $scope.seasonOptions = [];
    $scope.styleOptions = [];
    $scope.priceRangeOptions = [];
    $scope.superCategoryOptions =[];
    $scope.layerToLoadOptions = "all";
    
    $scope.layerOptions =[
        {value : "MyTokens_Layer1", displayValue : "layer 1 : Head", layerKey : "layer1"},
        {value : "MyTokens_Layer2", displayValue : "layer 2 : Body", layerKey : "layer2"},
        {value : "MyTokens_Layer3", displayValue : "layer 3 : Leg", layerKey : "layer3"},
        {value : "MyTokens_Layer4", displayValue : "layer 4 : Feet", layerKey : "layer4"}
    ];
    
    $scope.loadSuperCategories = function(layerOption){
        var superCategories = Parse.Object.extend("SuperCategories");
        var query = new Parse.Query(superCategories);
        if(layerOption != "all"){
//            console.log($scope.layerToLoadOptions)
            query.equalTo(layerOption,true);
            //set query to layer = 
        }
        query.find({
          success: function(results) {
              for(var i =0 ; i < results.length; i++){
                  var object = results[i];
                  $scope.superCategoryOptions.push(object);
              }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }
    
    $scope.loadCategories = function(layerOption){
        $scope.layerToLoadOptions = layerOption;
        var categories = Parse.Object.extend("Categories");
        var query = new Parse.Query(categories);
//        if(layer != "all"){
//            console.log(layer)
//            query.equalTo(layer,true);
//            //set query to layer = 
//        }
        query.find({
          success: function(results) {
              console.log(results);
              $scope.loadDataOptions(results);
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }
    
    //Load all data options from parse...
    $scope.loadDataOptions = function(categories) {
            for (var i = 0; i < categories.length; i++) {
                var object = categories[i];
                var categoriesName = object.get('name');
                
                switch(categoriesName){
                    case "Designer":
                        $scope.populateDataOptions("Designers",$scope.designerOptions);
                        break;
                    case "Type":
                        $scope.populateDataOptions("Types", $scope.typeOptions);
                        break;
                    case "Color":
                        $scope.populateDataOptions("Colors", $scope.colorOptions);
                        break;
                    case "Fabric":
                        $scope.populateDataOptions("Fabrics", $scope.fabricOptions);
                        break;
                    case "Season":
                        $scope.populateDataOptions("Seasons", $scope.seasonOptions);
                        break;
                    case "Style":
                        $scope.populateDataOptions("Styles", $scope.styleOptions);
                        break;
                    case "Pricerange":
                        $scope.populateDataOptions("Priceranges", $scope.priceRangeOptions);
                        break;
                }
            }
        $scope.$apply();
    }
    
    $scope.populateDataOptions = function(categoriesName,scopeToSet){
//        scopeToSet.push({something:"hey"})
        var categories = Parse.Object.extend(categoriesName);
        var query = new Parse.Query(categories);
        
        if($scope.layerToLoadOptions != "all"){
//            console.log($scope.layerToLoadOptions)
            query.equalTo($scope.layerToLoadOptions,true);
            //set query to layer = 
        }
        
        query.find({
          success: function(results) {
//              scopeToSet = results;
              for(var i =0 ; i < results.length; i++){
                  var object = results[i];
//                  scopeToSet.push({objectId: object.id , name : object.get('name')});
                  scopeToSet.push(object);
              }
              $scope.$apply();
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }
//Super test
    
    
    
    
    
    
    
    //TODO: merge to one notification.
    $scope.successNotiModal = function(description){
        var modalInstance = $modal.open({
          templateUrl: 'templates/notificationSuccess.html',
          controller: ModalInstanceCtrl,
          windowClass: 'app-modal-window',
          resolve: { 
              description : function(){
                return description;
              }
          }
        });
    }
    
    $scope.failNotiModal = function(description){
        var modalInstance = $modal.open({
          templateUrl: 'templates/notificationFailure.html',
          controller: ModalInstanceCtrl,
          windowClass: 'app-modal-window',
          resolve: { 
              description : function(){
                return description;
              }
          }
        });
    }
    
});

function ngGridDoubleClick() {
    var self = this;
    self.$scope = null;
    self.myGrid = null;

    // The init method gets called during the ng-grid directive execution.
    self.init = function(scope, grid, services) {
        // The directive passes in the grid scope and the grid object which
        // we will want to save for manipulation later.
        self.$scope = scope;
        self.myGrid = grid;
        self.assignEvents();
    };
    self.assignEvents = function() {
        // Here we set the double-click event handler to the header container.
        self.myGrid.$viewport.on('dblclick', self.onDoubleClick);
    };
    // double-click function
    self.onDoubleClick = function(event) {
        self.myGrid.config.dblClickFn(self.$scope.selectedItems[0]);
        self.$scope.$apply();
    };
}

var ModalInstanceCtrl = function ($scope, $modalInstance, description) {
  $scope.title = "Message from Heaven :" 
  $scope.description = description;
  $scope.dismiss = function () {
    $modalInstance.dismiss('cancel');
  };
};