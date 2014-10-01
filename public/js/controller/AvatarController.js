myApp.controller('AvatarController',function($scope,$modal) {
    var parseData;
    $scope.authorized = false;
//    $scope.layerSelected = false;
//    $scope.creatNewButton = "Create New Token";
    $scope.uploadFilename;
    $scope.displayData = []; 
    $scope.mySelection = [];
    $scope.avatar = {};
    
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
                                        {field: 'name', displayName: 'Name'},
                                        {field: 'imageUrl', displayName: 'thumbnail', visible:false}
                                    ]
                         };
    
    $scope.getAvatarFromParse = function(){
        
        var avatars = Parse.Object.extend("Avatars");
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
                    name : data.get("name"),
                    imageUrl : data.get("image").url()
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
          templateUrl: 'templates/modalEditAvatar.html',
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
        $scope.avatar = {};
        
        $scope.avatar.imageUrl = rowData.imageUrl;
        $scope.avatar.name = rowData.name;
        
        $(document).on('change', '.btn-file-replace :file', function() {
          var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
              input.trigger('fileselect', [numFiles, label]);
            $scope.avatarUploadFilename = label;
            $scope.$apply();
        });
        
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        
        $scope.save = function(){
            var Avatars = Parse.Object.extend("Avatars");
            var query = new Parse.Query(Avatars);
            
            query.equalTo("objectId", rowData.objectId);
            query.first({
              success: function(object) {
                  
                  object.set("name" , $scope.avatar.name);
                  
                  var fileUploadControl = $("#avatarFileUploadEdit")[0];
                  if (fileUploadControl.files.length > 0) {
                        var file = fileUploadControl.files[0];
                        var name = "avatar.png";
                        var parseFile = new Parse.File(name, file);
                        object.set("image",parseFile);
                  }  
                  
                  object.save(null,{
                      success: function(object) {
                          rowData.name = $scope.avatar.name;
                          rowData.imageUrl = object.get("image").url();
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

            $scope.saveBtnDisplay = "Saving .."; 
        }
        
        $scope.delete = function () {
//            $modalInstance.close('delete');
            if (confirm('Are you sure you want to delete this avatar ? There is no way back from here !')) {
                // Save it!
//                console.log("delete !");
                $scope.deleteBtnDisplay = "Deleting .."
                var Avatars = Parse.Object.extend("Avatars");
                var query = new Parse.Query(Avatars);
                query.equalTo("objectId", rowData.objectId);
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
                console.log("not delete :(");
            }
        };
    }
        
    ////////////CREATE AVATAR SECTION/////////////////////
    $scope.createAvatarHandler = function(){
        $scope.openModalCreateAvatar($scope); 
    }
    
    $scope.openModalCreateAvatar = function (parentScope) {

        var modalInstance = $modal.open({
          templateUrl: 'templates/modalCreateAvatar.html',
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
        $scope.avatar = {};
        
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        
        $(document).on('change', '.btn-file-replace :file', function() {
          var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
              input.trigger('fileselect', [numFiles, label]);
            $scope.avatarUploadFilename = label;
            $scope.$apply();
        });
        
        $scope.save = function(){

            
            var Avatars = Parse.Object.extend("Avatars");
            var newAvatar = new Avatars();

            newAvatar.set("name", $scope.avatar.name); 
            
            var fileUploadControl = $("#avatarFileUploadCreate")[0];
            if (fileUploadControl.files.length > 0) {
                var file = fileUploadControl.files[0];
                var name = "avatar.png";
                var parseFile = new Parse.File(name, file);
                newAvatar.set("image",parseFile);
            }
            
            if((fileUploadControl.files.length > 0) && $scope.avatar.name != null ){
                    $scope.saveBtnDisplay = "Saving ..";
                    newAvatar.save(null, {

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