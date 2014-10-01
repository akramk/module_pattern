myApp.controller('CreateController',function($scope,$modal) {
//    $scope.checkAuthorization();
    
    $scope.testMessage = "Youre about to create something";
    $scope.authorized = false;
    $scope.layerSelected = false;
    $scope.creatNewButton = "Create New Token";
    $scope.uploadFilename;
    $scope.formValid = true;
    
    $scope.token = {};
    
    var currentUser = Parse.User.current();
    //this should be a module ? yes.
    if(currentUser){
        var query = (new Parse.Query(Parse.Role));
        query.equalTo("name", "Administrator");
        query.equalTo("users", currentUser); 
        query.first().then(function(adminRole) {
            if (adminRole) {
                $scope.authorized = true;
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

    $scope.layerChangedHandler = function(layer){
//        console.log("here I am !");
//        console.log(layer);
        $scope.layerSelected = true;
        $scope.clearOptions();
        $scope.loadCategories(layer.layerKey);
        $scope.loadSuperCategories(layer.layerKey);
    };
    
    $scope.saveTokenToParse = function(){
        if($scope.isFormValid() == false){
            //
            $scope.failNotiModal("Some fields are missing. Please fill out everything !");
            return;
        }
        
        //TODO: validate field. // show noti : some field are missing..
        $scope.create_new_button_clicked =true;
        $scope.creatNewButton = "Creating... ";
        
        //for(var i = 0; i<1000; i++){//data duplication loop
          
         var Token = Parse.Object.extend($scope.token.layer.value);
         var newToken = new Token();

//             newToken.set("index",newIndex); 
         newToken.set("name", $scope.token.name); 
         newToken.set("desc", $scope.token.desc); 
         newToken.set("price", $scope.token.price);
         newToken.set("productUrl", $scope.token.productUrl);
        
         newToken.set("designer",$scope.token.designer);
         newToken.set("type",$scope.token.type); 
         newToken.set("color",$scope.token.color); 
         newToken.set("fabric",$scope.token.fabric);
         newToken.set("season",$scope.token.season);
         newToken.set("style",$scope.token.style);
         newToken.set("pricerange",$scope.token.priceRange);
         newToken.set("supercategory" ,$scope.token.superCategory); 
         newToken.set("approved" ,$scope.token.approved); 
        
         var fileUploadControl = $("#tokenFileUpload")[0];
         if (fileUploadControl.files.length > 0) {
            var file = fileUploadControl.files[0];
             
             //alert("File size: " +fileUploadControl.files[0].size);
            var name = "token.png";
            var parseFile = new Parse.File(name, file);
            newToken.set("image",parseFile);
         }  

         newToken.save(null, {
             
              success: function(token) {
                $scope.successNotiModal('New object created with objectId: ' + token.id);
                  $scope.create_new_button_clicked =false;
                $scope.creatNewButton = "Create New Token";
                $scope.$apply();
              },
             
              error: function(token, error) {
                $scope.successNotiModal('Failed to create new object, with error code: ' + error.message);
                $scope.creatNewButton = "Create New Token";
                $scope.$apply();
              }
             
         });
        
        //}END of the duplication for loop
        
        
    }
    
    $scope.isFormValid = function(){
//        console.log(Object.keys($scope.token).length);
//        console.log($("#tokenFileUpload")[0].files[0]);
        if(Object.keys($scope.token).length >= 13 && ($("#tokenFileUpload")[0].files[0] != undefined) ){ //number of form user have to fill
            //This is pretty hard-coded. should use some validation framework
            
            //return true;
        }
        if($scope.token.name==undefined || $scope.token.price==undefined || $scope.token.productUrl==undefined                          || $scope.token.designer==undefined 
           ||$scope.token.type==undefined || $scope.token.color==undefined || $scope.token.fabric==undefined                            ||$scope.token.season==undefined || $scope.token.style==undefined || $scope.token.priceRange==undefined                      || $scope.token.superCategory==undefined || ($("#tokenFileUpload")[0].files[0] == undefined)){
            console.log("undefined found");
            $scope.formValid = false;
//            console logs for debug
//            console.log($scope.token.name);
//            console.log($scope.token.price);
//            console.log($scope.token.productUrl);
//            console.log($scope.token.type);
//            console.log($scope.token.color);
//            console.log($scope.token.fabric);
//            console.log($scope.token.season);
//            console.log($scope.token.style);
//            console.log($scope.token.priceRange);
//            console.log($scope.token.superCategory);
//            console.log(($("#tokenFileUpload")[0].files[0] == undefined));
//            console.log("Stuck at first IF");
         }
        
        else{
            $scope.formValid = true;
        }
        console.log($scope.formValid);
        console.log("Stuck at last");
        return $scope.formValid;
    }
    
    
    //jquery part
    $(document).on('change', '.btn-file :file', function() {
      var input = $(this),
          numFiles = input.get(0).files ? input.get(0).files.length : 1,
          label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
          input.trigger('fileselect', [numFiles, label]);
        $scope.uploadFilename = label;
        $scope.$apply();
    });
    
});