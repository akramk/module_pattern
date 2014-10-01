myApp.controller('DesignerController',function($scope,$modal) {
    console.log("Designer COntroller called");
    var parseData;
    $scope.authorized = false;
//    $scope.layerSelected = false;
//    $scope.creatNewButton = "Create New Token";
    $scope.uploadFilename;
    $scope.displayData = []; 
    $scope.mySelection = [];
    $scope.avatar = {};
    $scope.found =false;
    $scope.paramLayerValue;
    $scope.paramObjectId;
    $scope.delete_button_clicked = false;
    
    var currentUser = Parse.User.current();
    //this should be a module ? yes.
    if(currentUser){
        var query = (new Parse.Query(Parse.Role));
        query.equalTo("name", "Administrator");
        query.equalTo("users", currentUser); 
        query.first().then(function(adminRole) {
            if (adminRole) {
                $scope.authorized = true;
                $scope.getAvatarFromParse();
                $scope.$apply();
            } else {
                //console.log("logout handler");
                $scope.logoutHandler();
                $scope.authorized = false;
                $scope.$apply();
            }
        });
    }else{
        $scope.logoutHandler();
    }
    
    
    ////////////// EDIT AVATAR SECTION ///////////////
    $scope.avatarDblClickHandler = function(rowItem) {
        $scope.openModalEditAvatar(rowItem,$scope);
    }
    
    
    
    $scope.gridOptions = {data: 'displayData',
                          multiSelect: false,
                         showFilter : false,
                         selectedItems: $scope.mySelection,
                         dblClickFn: $scope.avatarDblClickHandler,
                         plugins: [ngGridDoubleClick],
//                          filterOptions : $scope.filterOptions,
//                          rowTemplate : '<div style="height: 100%" ng-class="{green: row.getProperty(\'isDeleted\')}">',
                         columnDefs: [
                                        {field: 'objectId', displayName: 'ObjectId',visible:false},
                                        {field: 'name', displayName: 'Name'}
                                    ]
                         };
    
    $scope.getAvatarFromParse = function(){
        
        var avatars = Parse.Object.extend("Designers");
        var query = new Parse.Query(avatars);

        query.descending("createdAt");
        query.limit(1000); 

        query.find({
          success: function(results) {
            parseData = results;
            $scope.displayData = [];
            for (var i = 0; i < results.length; i++) {
                var data = results[i];
                $scope.displayData.push({
                    objectId : data.id,
                    name : data.get("name")
                });
            }
            $scope.$apply();  
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }
    
    ////////////// EDIT AVATAR SECTION ///////////////
    $scope.openModalEditAvatar = function(rowData,parentScope){
        var modalInstance = $modal.open({
          templateUrl: 'templates/modalEditDesigner.html',
          controller: $scope.modalEditAvatar,
          size: 'lg',
          resolve: {
              rowData: function() {
                  return rowData;
              },
              parentScope : function(){
                  return parentScope;
              }
          }
        });

        modalInstance.result.then(
          //close
          function (result) {
              console.log("Modal was dismissed : save");
          },
          //dismiss
          function (result) {
              console.log("Modal was dismissed : cancel");
          },
          function (result) {
              console.log("Modal was dismissed : delete");
          }
        );
    }
    
    $scope.modalEditAvatar = function($scope, $modalInstance, rowData, parentScope){
        
        $scope.saveBtnDisplay = "Save";
        $scope.deleteBtnDisplay = "Delete";
        $scope.designer = {};
        
        $scope.designer.name = rowData.name;
        
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        
        $scope.save = function(){
            var Designers = Parse.Object.extend("Designers");
            var query = new Parse.Query(Designers);
            
            query.equalTo("objectId", rowData.objectId);
            query.first({
              success: function(object) {
                  
                  object.set("name" , $scope.designer.name); 
                  
                  object.save(null,{
                      success: function(object) {
                          rowData.name = $scope.designer.name;
                          $modalInstance.close('submit');
                        // The save was successful.
                      },
                      error: function(object, error) {
                        //Throw some error...
                      }
                  });

              },
              error: function(error) {
                alert("Error: " + error.code + " " + error.message);
              }
            });
            $scope.create_new_button_clicked = true;
            $scope.saveBtnDisplay = "Saving .."; 
        }
        
        $scope.canDelete = function(success,failure){
            var Layer1 = Parse.Object.extend("MyTokens_Layer"+$scope.paramLayerValue);
                var queryLayer1 = new Parse.Query(Layer1);
                queryLayer1.equalTo("designer", {__type:"Pointer", className:"Designers", objectId: $scope.paramObjectId});
                queryLayer1.find({
                    success:function(results){
//                        console.log("found in layer1");
//                        console.log(results.length);
                            if(results.length > 0){
                                $scope.found = true;
                                foundString = "Layer1";
                                if(typeof(failure) == "function"){failure();}
//                                console.log("Inside layer1"+$scope.found);
                            } else{
                                $scope.found = false;
                                $scope.paramLayerValue++;
                                if($scope.paramLayerValue <= 4){
//                                    console.log("layer: "+$scope.paramLayerValue)
//                                    console.log("recursive ! ");
                                    $scope.canDelete(success,failure);
                                } else {
//                                    console.log("try to do call back");
                                    if(typeof(success) == "function"){
                                        success();
                                    }
                                }
                        }
//                        callBackTest($scope.found);
                        }//layer
                
                });
                $scope.delete_button_clicked = true;
                $scope.deleteBtnDisplay = "Deleting...";
        }
        
        $scope.delete = function () {
            $scope.paramLayerValue=1;
            $scope.paramObjectId=rowData.objectId;
            var testFoundVar = $scope.canDelete(function(){
                if($scope.found == false){
                    console.log($scope.found);
                    console.log("Layer"+$scope.paramLayerValue);
                if (confirm('Are you sure you want to delete this Designer ? There is no way back from here !')) {
                // Save it!
                var Designers = Parse.Object.extend("Designers");
                var query = new Parse.Query(Designers);
                query.equalTo("objectId", rowData.objectId);              
                console.log(rowData.objectId);
                query.first({
                    success: function(object) {
                        object.destroy({
                              success: function(myObject) {
                                  parentScope.getAvatarFromParse();
                                  $modalInstance.close('delete');
                              },
                              error: function(myObject, error) {
                                  window.alert(error);
                              }
                        });
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
                
            } else {
                $scope.cancel();
                $scope.delete_button_clicked = false;
                console.log($scope.delete_button_clicked);
                $scope.deleteBtnDisplay = "Delete";
                console.log($scope.deleteBtnDisplay);
                console.log("not delete :(");
                }   
             }//end of delete success
                
            },function(){
                console.log("fail");
                $scope.cancel();
                $scope.delete_button_clicked = false;
                $scope.deleteBtnDisplay = "Delete";
                console.log("This designer has some token assigned in Layer"+$scope.paramLayerValue);
                alert("This designer has some token assigned in Layer"+$scope.paramLayerValue);
            });
        }

    }
        
    ////////////CREATE AVATAR SECTION/////////////////////
    $scope.createAvatarHandler = function(){
        $scope.openModalCreateAvatar($scope); 
    }
    
    $scope.openModalCreateAvatar = function (parentScope) {

        var modalInstance = $modal.open({
          templateUrl: 'templates/modalCreateDesigner.html',
          controller: $scope.modalCreateAvatar,
          size: 'lg',
          resolve: {
              parentScope: function() {
                  return parentScope;
              }
          }
        });

        modalInstance.result.then(
          //close
          function (result) {
              console.log("Modal was dismissed : save");
//              $scope.removeRow();
//            alert("Modal was closed.");
          },
          //dismiss
          function (result) {
              console.log("Modal was dismissed : cancel");
//            alert("Modal was dismissed");
          }
        );
  };
    
    $scope.modalCreateAvatar = function($scope, $modalInstance,parentScope) {

        $scope.saveBtnDisplay = "Save";
        $scope.designer = {};
        
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        
        $scope.save = function(){

            
            var Designers = Parse.Object.extend("Designers");
            var newDesigner = new Designers();
            
            console.log($scope.designer.name);
            newDesigner.set("name", $scope.designer.name);
            newDesigner.set("layer1", true);
            newDesigner.set("layer2", true);
            newDesigner.set("layer3", true);
            newDesigner.set("layer4", true);
            newDesigner.set("superCategory", "All");
            
            if($scope.designer.name != null ){
                    $scope.create_new_button_clicked =true;
                    $scope.saveBtnDisplay = "Saving ..";
                    newDesigner.save(null, {

                      success: function(avatar) {
                          $modalInstance.dismiss('save');
                          parentScope.getAvatarFromParse();
                      },

                      error: function(token, error) {
                          //TODO : throw some error... 
                      }

                 });
            }
        }
        
    } 
});