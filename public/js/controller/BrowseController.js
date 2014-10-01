myApp.controller('BrowseController',function($scope,$modal) {

//    $scope.hoverIn = function(){
//        console.log("Inside hover");
//        this.hoverEdit = true;
//    };
//
//    $scope.hoverOut = function(){
//        console.log("Outside hover");
//        this.hoverEdit = false;
//    };
    
    //This mark up has to be on every controller
//    $scope.checkAuthorization();
    var parseData;
    
    var currentUser = Parse.User.current();
    $scope.displayData = []; 
    $scope.mySelection = [];
    $scope.token = {};
    $scope.selectedLayer = null;
    $scope.totalcount=0;
    $scope.skipper ={};
    $scope.rowCount =0;
    $scope.limiter = 50;
        
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: false
    };
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
    } else {
        $scope.logoutHandler();
    }
    
    $scope.myDblClickHandler = function(rowItem) {
        if(rowItem.isDeleted == false){
            $scope.openModalEditor(rowItem);
        }
    }
    
    $scope.openModalEditor = function (rowData) {

        var modalInstance = $modal.open({
          templateUrl: 'templates/modalEditor.html',
          controller: $scope.ModalEditorCtrl,
          size: 'lg',
          resolve: {
              rowData: function() {
                  return rowData;
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
          },
          function (result) {
              console.log("Modal was dismissed : delete");
//            alert("Modal was dismissed");
          }
        );
  };
//    $scope.$watch('textFilter',function(value) {
//      console.log("I am here");
//      console.log('textFilter',value,$scope);
//      if (value && $scope.filterOptions)  $scope.filterOptions.filterText = value;
//    });
    
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: $scope.limiter,
        currentPage: 1
    };  
    
    $scope.setPagingData = function(data, page, pageSize, totalRows){	
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = totalRows;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getDataFromParse($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.selectedLayer, $scope.rowCount, "");
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.selectedLayer, $scope.rowCount, "");
        }
    }, true);
    
    $scope.gridOptions = {data: 'displayData',
                          multiSelect: false,
                          enablePaging: true,
                          showFooter:true,
                          showFilter : false,
                          totalServerItems:'totalServerItems',
                          pagingOptions: $scope.pagingOptions,
                         selectedItems: $scope.mySelection,
                          dblClickFn: $scope.myDblClickHandler,
                          plugins: [ngGridDoubleClick],
                          filterOptions : $scope.filterOptions,
//                          rowTemplate : '<div style="height: 100%" ng-class="{green: row.getProperty(\'isDeleted\')}">',
                         columnDefs: [
                                        {field: 'objectId', displayName: 'Object Id',visible:false},
                                        //mark red
                                        {field: 'approved',displayName: '',width :'20px',
                                        cellTemplate: '<div ng-class="{\'token-approved\': row.getProperty(\'approved\') == true,'+
                                         '\'token-notapproved\': row.getProperty(\'approved\') == false'
                                         +'}"><div class="ngCellText">.</div></div>'}, 
                                        {
                                         field: 'name', 
                                         displayName: 'Name',
                                         cellTemplate: '<div ng-class="{delete: row.getProperty(\'isDeleted\') == true}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
                                        },
                                        {field: 'designer', displayName: 'Designer'},
                                        {field: 'price', displayName: 'Price',width:'65px'},
                                        {field: 'type', displayName: 'Type',width:'100px'},
                                        {field: 'color', displayName: 'Color',visible:false,width:'100px'},
                                        {field: 'fabric', displayName: 'Fabric',width:'110px'},
                                        {field: 'style', displayName: 'Style',width:'120px'},
                                        {field: 'season', displayName: 'Season',visible:false}
                                    ]
                         };
    
    $scope.remoteSearch = function(searchString){
        $scope.getDataFromParse($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.selectedLayer, $scope.rowCount, searchString);
    }

    
    
    $scope.getDataFromParse = function(pageSize, page, layer, totalRows,textFilter){
        
        var tokens = Parse.Object.extend(layer.value);
        
        var query = new Parse.Query(tokens);
        console.log("current page "+page);
        
        query.include("color");
        query.include("designer");
        query.include("type");
        query.include("color");
        query.include("fabric");
        query.include("pricerange");
        query.include("season");
        query.include("style");
        query.include("supercategory");

        query.descending("createdAt");
        query.contains("name",textFilter);
        query.limit($scope.limiter); 
        query.skip(pageSize*(page-1));
//        var Designers = Parse.Object.extend("Designers");
//        var innerQuery = new Parse.Query(Designers);
//        innerQuery.contains("name",textFilter);
//    
//        query.matchesQuery("designer",innerQuery);
//        query.contains("designer",textFilter);
        query.find({
          success: function(results) {
            parseData = results;
            $scope.displayData = [];
              console.log(pageSize);
              console.log("EQ: "+ (pageSize)*(page-1));
              console.log(page);
              console.log(textFilter.length);
              
              if(textFilter.length != 0){//for remotesearch
                  $scope.setPagingData(results, page, pageSize, results.length);
              }//for remotesearch
               else{//for primary load of the table
                   $scope.setPagingData(results, page, pageSize, totalRows);
               }//for the primary table load
              
            for (var i = 0/*(pageSize)*(page-1)*/; i < (results.length && (pageSize)*(page)); i++) {
                if(i<results.length){
//                console.log("iterator: "+i);
                var data = results[i];
					
				if(
					data.get("image") == undefined || 
				 	data.get("designer") == undefined ||
				 	data.get("type") == undefined ||
				 	data.get("color") == undefined ||
				 	data.get("fabric") == undefined ||
				 	data.get("style") == undefined ||
				 	data.get("season") == undefined ||
				 	data.get("supercategory") == undefined ||
				 	data.get("pricerange") == undefined
				  ){
					continue;
				}
					
					$scope.displayData.push({
						objectId : data.id,
						name : data.get("name"),
						designer : data.get("designer").get("name"),
						desc: data.get("desc"),
						price : data.get("price"),
						productUrl :data.get("productUrl"),
						type : data.get("type").get("name"),
						color : data.get("color").get("name"),
						fabric : data.get("fabric").get("name"),
						style : data.get("style").get("name"),
						season : data.get("season").get("name"),
						superCategory : data.get("supercategory").get("name"),
						priceRange : data.get("pricerange").get("name"),
						imageUrl : data.get("image").url(),
						layerName : layer.value,
						isDeleted : false,
						approved : data.get("approved")
					});
             }
            }
              
//            globalData = $scope.displayData;
              
            $scope.$apply();
              
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }
    
    $scope.layerChangedHandler = function(layer){
        $scope.selectedLayer = layer;
        $scope.clearOptions();
//        console.log(layer);
        $scope.loadCategories(layer.layerKey);
        $scope.loadSuperCategories(layer.layerKey);
        $scope.resetOptions();
        
        var tokens1 = Parse.Object.extend(layer.value);
        var query1 = new Parse.Query(tokens1);
        
        query1.count({
            success:function(object){
                console.log("TOTAL count: "+object);
                $scope.rowCount = object;
                    $scope.getDataFromParse($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, layer, $scope.rowCount,"");
                
                
            }
        });
        
        
//        $scope.getDataFromParse($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, layer,"");
    }
    
    var editorDesignerOptions;
    var editorTypeOptions;
    var editorColorOptions;
    var editorFabricOptions;
    var editorSeasonOptions;
    var editorStyleOptions;
    var editorPriceRangeOptions;
    var editorSuperCategoryOptions;
    
    $scope.resetOptions = function(){
        editorDesignerOptions = $scope.designerOptions;
        editorTypeOptions = $scope.typeOptions;
        editorColorOptions = $scope.colorOptions;
        editorFabricOptions = $scope.fabricOptions;
        editorSeasonOptions = $scope.seasonOptions;
        editorStyleOptions = $scope.styleOptions;
        editorPriceRangeOptions = $scope.priceRangeOptions;
        editorSuperCategoryOptions = $scope.superCategoryOptions;
    }
    
    $scope.resetOptions();
//    var editorLayerOptions = $scope.layerOptions;
    
    //move this to another class ? maybe 
    $scope.ModalEditorCtrl = function($scope, $modalInstance, rowData) {
        
        $scope.hoverIn = function(){
//            console.log("Inside hover");
            this.hoverEdit = true;
        };

        $scope.hoverOut = function(){
            console.log("Outside hover");
            this.hoverEdit = false;
        };
        
        $scope.saveBtnDisplay = "Save";
        $scope.deleteBtnDisplay = "Delete";
        $scope.token = {};
        
//        console.log(rowData.image);
        $scope.token.imgUrl = rowData.imageUrl;
        $scope.token.name = rowData.name;
        $scope.token.desc = rowData.desc;
        $scope.token.price = rowData.price;
        $scope.token.productUrl = rowData.productUrl;
        
//        console.log(rowData)
        $scope.designerOptions = editorDesignerOptions;
        $scope.typeOptions = editorTypeOptions;
        $scope.colorOptions = editorColorOptions;
        $scope.fabricOptions = editorFabricOptions;
        $scope.seasonOptions = editorSeasonOptions;
        $scope.styleOptions = editorStyleOptions;
        $scope.priceRangeOptions = editorPriceRangeOptions;
        $scope.superCategoryOptions = editorSuperCategoryOptions;
        
        $scope.token.designer = $scope.designerOptions[findIndexOptionByName(rowData.designer,$scope.designerOptions)];
        $scope.token.type = $scope.typeOptions[findIndexOptionByName(rowData.type,$scope.typeOptions)];
        $scope.token.color = $scope.colorOptions[findIndexOptionByName(rowData.color,$scope.colorOptions)];
        $scope.token.fabric = $scope.fabricOptions[findIndexOptionByName(rowData.fabric,$scope.fabricOptions)];
        $scope.token.season = $scope.seasonOptions[findIndexOptionByName(rowData.season,$scope.seasonOptions)];
        $scope.token.style = $scope.styleOptions[findIndexOptionByName(rowData.style,$scope.styleOptions)];
        $scope.token.priceRange = $scope.priceRangeOptions[findIndexOptionByName(rowData.priceRange,$scope.priceRangeOptions)];
        $scope.token.superCategory = $scope.superCategoryOptions[findIndexOptionByName(rowData.superCategory,$scope.superCategoryOptions)];
        $scope.token.approved = rowData.approved;
        
        $(document).on('change', '.btn-file-replace :file', function() {
          var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
              input.trigger('fileselect', [numFiles, label]);
            $scope.uploadFilename = label;
            $scope.$apply();
        });
        
        $scope.awesomeEditClick = function(){
            $scope.openAwesomeEditorMode(rowData); 
        }
                //picture editor mode
        $scope.openAwesomeEditorMode = function(rowData){
            
            var modalInstance = $modal.open({
              templateUrl: 'templates/modalAwesomeEditMode.html',
              controller: $scope.ModalAwesomeEditorCtrl,
              size: 'lg',
              resolve: {
                  rowData: function() {
                      return rowData;
                  }
              }
            });

            modalInstance.result.then(
              //close
              function (result) {
//                  console.log("Modal was dismissed : cancel");
              },
              //dismiss
              function (result) {
//                  console.log("Modal was dismissed : save");
              }
            );
        };

        $scope.ModalAwesomeEditorCtrl = function($scope, $modalInstance, rowData) {

            $scope.saveBtn = "Save";
//            console.log("I am here");
            $scope.cancel = function () {
                console.log("cancel");
                $modalInstance.dismiss('cancel');
            };

            console.log(rowData.imageUrl);
            imageUrlEditor = rowData.imageUrl;
//            var canvas = this.__canvas = new fabric.Canvas('awesome-editor');
//            fabric.Object.prototype.transparentCorners = false;
//            fabric.Image.fromURL('http://files.parsetfss.com/28dae413-0e77-423a-806e-c564243f2d07/tfss-d54f9a10-b341-4950-93a4-8f6c6016df32-token.png', function(img) {
//                console.log("I am here");
//                img.scale(0.5).set({
//                    left: 100,
//                    top: 100,
//                    angle: -15
//                });
//            canvas.add(img).setActiveObject(img);
//            canvas.on("after:render", function(){ canvas.calcOffset() });
//          });
        };
        
//        $scope.openAwesomeEditorMode = function(){
//            console.log("I am here");
//        };
        
        $scope.delete = function () {
//            $modalInstance.close('delete');
            if (confirm('Are you sure you want to delete this token ? There is no way back from here !')) {
                // Save it!
//                console.log("delete !");
                $scope.delete_button_clicked = true;
                $scope.deleteBtnDisplay = "Deleting .."
                var Token = Parse.Object.extend(rowData.layerName);
                var query = new Parse.Query(Token);
                query.equalTo("objectId", rowData.objectId);
                query.first({
                    success: function(object) {
//                        console.log(object);
//                        $modalInstance.close('delete');
                            
//                        rowData.isDeleted = true;
                        object.destroy({
                              success: function(myObject) {
                                  //remove from the table
                                  rowData.isDeleted = true;
                                  rowData.name = rowData.name + "(Deleted)";
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
                // Do nothing!
            }
        };
        $scope.cancel = function () {
            console.log("cancel");
            $modalInstance.dismiss('cancel');
        };

        $scope.save = function () {
            
            var Token = Parse.Object.extend(rowData.layerName);
            var query = new Parse.Query(Token);
            query.equalTo("objectId", rowData.objectId);
            
            query.first({
              success: function(object) {
                  console.log($scope.token.name);
                  object.set("name" , $scope.token.name);
                  object.set("desc" , $scope.token.desc);
                  object.set("price" , $scope.token.price);
                  object.set("productUrl", $scope.token.productUrl);
                  object.set("designer" , $scope.token.designer);
                  object.set("type" , $scope.token.type);
                  object.set("color" , $scope.token.color);
                  object.set("fabric" , $scope.token.fabric);
                  object.set("pricerange" , $scope.token.priceRange);
                  object.set("season" , $scope.token.season);
                  object.set("style" , $scope.token.style);
                  object.set("supercategory" , $scope.token.supercategory);
                  object.set("approved",$scope.token.approved); 
                  
                  var fileUploadControl = $("#tokenFileUploadEditor")[0];
                  if (fileUploadControl.files.length > 0) {
                        var file = fileUploadControl.files[0];
                        var name = "token.png";
                        var parseFile = new Parse.File(name, file);
                        object.set("image",parseFile);
                  }  
                  
                  object.save(null,{
                      success: function(object) {
                          console.log(object);
                          console.log(object.get("image"));
//                          console.log(rowData);
                          console.log("entered");
                          rowData.name = $scope.token.name;
                          rowData.desc = $scope.token.desc;
                          rowData.price = $scope.token.price;
                          rowData.productUrl = $scope.token.productUrl;
                          rowData.designer = $scope.token.designer.get("name");
                          rowData.type = $scope.token.type.get("name");
                          rowData.color = $scope.token.color.get("name");
                          rowData.fabric = $scope.token.fabric.get("name");
                          rowData.priceRange = $scope.token.priceRange.get("name");
                          rowData.season = $scope.token.season.get("name");
                          rowData.style = $scope.token.style.get("name");
                          rowData.superCategory = $scope.token.superCategory.get("name");
                          rowData.imageUrl = object.get("image").url();
                          rowData.approved = $scope.token.approved;
                          
//                          rowData.price = $scope.token.price;
//                          rowData.desc = "test"; // yes you can set the scope here ! woo hooo thank you angularJS
                          $modalInstance.close('submit');
                        // The save was successful.
                      },
                      error: function(object, error) {
//                          console.log("error")
                      }
                  });

              },
              error: function(error) {
                alert("Error: " + error.code + " " + error.message);
              }
            });
            $scope.save_button_clicked = true;
            $scope.saveBtnDisplay = "Saving ..";
        };
    };
    
    
});
function findIndexOptionByName(string,options){
    for(var i = 0 ; i <options.length; i++){
        if(string == options[i].get("name")) {
            return i;
        };    
    }
    return -1;
}

//function ngGridDoubleClick() {
//    var self = this;
//    self.$scope = null;
//    self.myGrid = null;
//
//    // The init method gets called during the ng-grid directive execution.
//    self.init = function(scope, grid, services) {
//        // The directive passes in the grid scope and the grid object which
//        // we will want to save for manipulation later.
//        self.$scope = scope;
//        self.myGrid = grid;
//        self.assignEvents();
//    };
//    self.assignEvents = function() {
//        // Here we set the double-click event handler to the header container.
//        self.myGrid.$viewport.on('dblclick', self.onDoubleClick);
//    };
//    // double-click function
//    self.onDoubleClick = function(event) {
//        self.myGrid.config.dblClickFn(self.$scope.selectedItems[0]);
//        self.$scope.$apply();
//    };
//}