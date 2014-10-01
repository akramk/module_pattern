//function getBase64Image(img) {
//    // Create an empty canvas element
//    var canvas = document.createElement("canvas");
//    canvas.width = img.width;
//    canvas.height = img.height;
//
//    // Copy the image contents to the canvas
//    var ctx = canvas.getContext("2d");
//    ctx.drawImage(img, 0, 0);
//
//    // Get the data-URL formatted image
//    // Firefox supports PNG and JPEG. You could check img.src to
//    // guess the original format, but be aware the using "image/jpg"
//    // will re-encode the image.
//    var dataURL = canvas.toDataURL();
//
//    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
//}

myApp.controller('ImportController',function($scope,$modal,$http) {
	
	//initial not specified query
//	var seasonNotSpecifiedObject;
//	var Season = Parse.Object.extend("Seasons");
//	var query = new Parse.Query(Season);
//	query.equalTo("name", "Not Specified");
//		  query.first({
//		  success: function(object) {			  
//			  seasonNotSpecifiedObject = object;
//		  },
//		  error: function(error) {
//			alert("Error: " + error.code + " " + error.message);
//		  }
//	});
	
	$scope.productType = [];
	$scope.currentTokenData;
	$scope.rawProductData;
	$scope.tokenDataNumber = 0;
	$scope.currentTokenDesc = "";
	
//    $scope.productsData;
	$http({
            method: 'GET', 
            url: 'data/warehouse.json',
            data : { 
                byteStream : $scope.selectedByteStream 
            }
        }).
        success(function(data, status, headers, config) {
			$scope.rawProductData = data.products.product;
			$scope.totalTokenNumber = $scope.rawProductData.length;
            $scope.parsedata(data.products);
			$scope.$apply();
        }).
        error(function(data, status, headers, config) {
            console.log("AJAX Error.");
        });
	
	$scope.isContainInProductType = function(type){
		
		for(var i = 0 ; i < $scope.productType.length; i ++){
			if($scope.productType[i] == type){
				return true;
			}
		}
		return false;
	}
	
//	$scope.findPointerObject = function(name, tableName, success, failure){
//		var Designer = Parse.Object.extend(tableName);
//		var query = new Parse.Query(Designer);
//		query.equalTo("name", name);
//		query.first({
//		  success: function(object) {
//			  success(object);
//		  },
//		  error: function(error) {
//			  failure(error);
//		  }
//		});
//	}
	
	$scope.findPriceRangeObjectFromPrice = function(price,dataobject){
		if( price < 50 ) {
			return $scope.findParseObjectFromName("Under €50",dataobject);
		}else if(price > 50 && price < 100){
			return $scope.findParseObjectFromName("€50 to €100",dataobject);
		}else if (price > 100 && price < 250){
			return $scope.findParseObjectFromName("€100 to €250",dataobject);
		}else if (price > 250 && price < 500){
			return $scope.findParseObjectFromName("€250 to €500",dataobject);
		} else if (price > 500 && price < 1000){
			return $scope.findParseObjectFromName("€500 to 1000",dataobject);
		} else if (price > 1000){
			return $scope.findParseObjectFromName("€1000 & Above",dataobject);
		} else {
			return $scope.findParseObjectFromName("Not Specified",dataobject);
		}  
	}
	
	$scope.findColorObjectFromColor = function(color,dataobject){
		if( color == "Schwarz") {
			return $scope.findParseObjectFromName("Black",dataobject);
		}else if(color == "Braun"){
			return $scope.findParseObjectFromName("Brown",dataobject);
		}else if (color == "Grau"){
			return $scope.findParseObjectFromName("Grey",dataobject);
		}else if (color == "Grün"){
			return $scope.findParseObjectFromName("Green",dataobject);
		} else if (color == "Blau"){
			return $scope.findParseObjectFromName("Blue",dataobject);
		} else if (color == "Multi"){
			return $scope.findParseObjectFromName("Multi",dataobject);
		} else if (color == "Orange"){
			return $scope.findParseObjectFromName("Orange",dataobject);
		}else if (color == "Rot"){
			return $scope.findParseObjectFromName("Red",dataobject);
		}else if (color == "Gelb"){
			return $scope.findParseObjectFromName("Yellow",dataobject);
		}else if (color == "Grey"){
			return $scope.findParseObjectFromName("Grey",dataobject);
		}else if (color == "Animal"){
			return $scope.findParseObjectFromName("Grey",dataobject);
		}else if (color == "Pink"){
			return $scope.findParseObjectFromName("Pink",dataobject);
		}else if (color == "Violett"){
			return $scope.findParseObjectFromName("Purple",dataobject);
		}else {
			return $scope.findParseObjectFromName("Not Specified",dataobject);
		}  
	}
	
	$scope.findSuperCatObjectFromType = function(type,dataobject){
		if( type == "Bekleidung & Accessoires") {
			return $scope.findParseObjectFromName("All",dataobject);
		}else if(type == "Handtaschen"){
			return $scope.findParseObjectFromName("Handbags",dataobject);
		}else if (type == "Mäntel & Jacken"){
			return $scope.findParseObjectFromName("Clothing",dataobject);
		}else if (type == "Shirts & Tops"){
			return $scope.findParseObjectFromName("Clothing",dataobject);
		}else if (type == "Leggings"){
			return $scope.findParseObjectFromName("Clothing",dataobject);
		}else if (type == "Jeans"){
			return $scope.findParseObjectFromName("Clothing",dataobject);
		}else if (type == "Bekleidung"){
			return $scope.findParseObjectFromName("Clothing",dataobject);
		}else {
			return $scope.findParseObjectFromName("All",dataobject);
		}
	}
	
	$scope.findTypeObjectFromType = function(type,dataobject,desc){
//		console.log(desc);
		if(desc.indexOf("Hut") != -1){
			return $scope.findParseObjectFromName("Hats",dataobject);
		}
		
		if( type == "Bekleidung & Accessoires") {
			return $scope.findParseObjectFromName("Not Specified",dataobject);
		}else if(type == "Handtaschen"){
			return $scope.findParseObjectFromName("Not Specified",dataobject);
		}else if (type == "Mäntel & Jacken"){
			return $scope.findParseObjectFromName("Jackets & Coats",dataobject);
		}else if (type == "Shirts & Tops"){
			return $scope.findParseObjectFromName("Tops & Tees",dataobject);
		}else if (type == "Leggings"){
			return $scope.findParseObjectFromName("Pants & Capris",dataobject);
		}else if (type == "Jeans"){
			return $scope.findParseObjectFromName("Jeans",dataobject);
		}else if (type == "Bekleidung"){
			return $scope.findParseObjectFromName("Not Specified",dataobject);
		}else {
			return $scope.findParseObjectFromName("Not Specified",dataobject);
		}  
	}
	
	$scope.findParseObjectFromName = function(name,dataobject){

		var toReturnWhenNotFound;
		for(var i = 0 ; i < dataobject.length ; i++){
			
			if(dataobject[i].get("name") == "Not Specified"){
				toReturnWhenNotFound = dataobject[i];
			}
			
			if(dataobject[i].get("name") == name){
				return dataobject[i];
			}
		}
		
		return toReturnWhenNotFound;
	}
	
	$scope.uploadToken = function(layer){
		$scope.isAdding = true;
		console.log($scope.currentTokenData);
		
		var tokendata = $scope.currentTokenData;
		var Token = Parse.Object.extend(layer);
        var newToken = new Token();
		
		newToken.set("name", tokendata.name); 
        newToken.set("price", parseInt(tokendata.price)); 
		newToken.set("approved", false); 
		newToken.set("desc",tokendata.description);
		newToken.set("currency", tokendata.currency);
        newToken.set("image_url", tokendata.url_image_productshot); 
		newToken.set("productUrl",tokendata.url_product);
		newToken.set("original_product_id", tokendata.sku);
		newToken.set("designer_color", tokendata.extras.colour);
		newToken.set("original_type", tokendata.extras.type);
		newToken.set("sex",tokendata.extras.sex);
						
		var Designer = Parse.Object.extend("Designers");
		var query = new Parse.Query(Designer);
		
//		console.log($scope.designerOptions);
		var designerObject = $scope.findParseObjectFromName("Warehouse",$scope.designerOptions);
		var fabricObject = $scope.findParseObjectFromName("Not Specified",$scope.fabricOptions);
		var seasonObject = $scope.findParseObjectFromName("Not Specified",$scope.seasonOptions);
		var styleObject = $scope.findParseObjectFromName("Not Specified",$scope.styleOptions);
		var priceObject = $scope.findPriceRangeObjectFromPrice(tokendata.price, $scope.priceRangeOptions);
		var colorObject = $scope.findColorObjectFromColor(tokendata.extras.colour, $scope.colorOptions);
//		var typeObject = $scope.findTypeObjectFromType(tokendata.extras.type, $scope.typeOptions);
//		var superCatObject = $scope.findSuperCatObjectFromType(tokendata.extras.type,$scope.superCategoryOptions);
//		var typeObject
		
		newToken.set("designer", designerObject);
		newToken.set("fabric", fabricObject);
		newToken.set("season", seasonObject);
		newToken.set("style", styleObject);
		newToken.set("pricerange", priceObject);
		newToken.set("color", colorObject);
		newToken.set("type", $scope.currentTypeObject);
		newToken.set("supercategory", $scope.currentSuperCat);
		
		newToken.save(null, {
				  success: function(token) {
					  $scope.tokenDataNumber = $scope.tokenDataNumber + 1;
					  $scope.applyToken($scope.tokenDataNumber);
					  
//				  	  $scope.currentTokenData = $scope.rawProductData[$scope.tokenDataNumber];
//					  $scope.currentTokenData.url_image = $scope.currentTokenData.url_image.split(".jpg")[0] + '_1.jpg'; 
//					  $scope.imageUrl = $scope.currentTokenData.url_image;
//					  $scope.$apply();
				  },
				
				  error: function(token, error) {
				  
				  }

			 });
	}
	
	$scope.skipToken = function(){
		$scope.tokenDataNumber = $scope.tokenDataNumber + 1;
		$scope.applyToken($scope.tokenDataNumber);
		
//		$scope.currentTokenData = $scope.rawProductData[$scope.tokenDataNumber];
//		$scope.currentTokenData.url_image = $scope.currentTokenData.url_image.split(".jpg")[0] + '_1.jpg'; 
//		$scope.imageUrl = $scope.currentTokenData.url_image;
//		$scope.$apply();
	}
	
	$scope.applyToken = function(tokenNumber){
		$scope.tokenDataNumber = tokenNumber;
		$scope.currentTokenData = $scope.rawProductData[$scope.tokenDataNumber];
		$scope.currentTokenData.url_image_productshot = $scope.currentTokenData.url_image.split(".jpg")[0] + '_1.jpg'; 
		$scope.imageUrl = $scope.currentTokenData.url_image_productshot;
		$scope.isAdding = false;
		
		$scope.currentTypeObject = $scope.findTypeObjectFromType($scope.currentTokenData.extras.type,
																 $scope.typeOptions,
																 $scope.currentTokenData.description);
		
		$scope.currentSuperCat = $scope.findSuperCatObjectFromType($scope.currentTokenData.extras.type,$scope.superCategoryOptions);
		
		$scope.currentTokenDesc = $scope.currentTokenData.description;
		$scope.currentTokenName = $scope.currentTokenData.name;
//		console.log($scope.currentTokenData.extras.type);
		console.log($scope.currentTypeObject);
//		$scope.currentSuperCat = superCatObject;
//		console.log(typeObject);
//		$scope.currentTypeObject = typeObject;		
//		$scope.currentTypeObject = typeObject.get("name");
//		
		$scope.$apply();
		console.log($scope.currentTypeObject);
	}
	
	$scope.parsedata = function(data){
		console.log(data);
		console.log( $scope.rawProductData);
		$scope.currentTokenData  = $scope.rawProductData[$scope.tokenDataNumber];
		
		$scope.applyToken($scope.tokenDataNumber);
//		for(var i = 0; i < data.product.length ; i ++){
//			
//			if($scope.isContainInProductType(data.product[i].extras.type) == false){
////				console.log('here')
//				$scope.productType.push(data.product[i].extras.type)
//			}
//			
//// 			if the productype not found, add it.
////			console.log(data.product[i].extras)
//		}
		
//		console.log($scope.productType);
//		$scope.currentTypeObject = $scope.findTypeObjectFromType($scope.currentTokenData.extras.type, $scope.typeOptions);
//		$scope.currentSuperCat = $scope.findSuperCatObjectFromType($scope.currentTokenData.extras.type,$scope.superCategoryOptions);
//		$scope.currentTokenData.url_image_productshot = $scope.currentTokenData.url_image.split(".jpg")[0] + '_1.jpg'; 
//		$scope.imageUrl = $scope.currentTokenData.url_image_productshot;
//		$scope.$apply();
	}
//		var Token = Parse.Object.extend("MyTokens_Layer2");
//        var newToken = new Token();
//		
//		newToken.set("name", tokendata.name); 
//        newToken.set("price", parseInt(tokendata.price)); 
//		newToken.set("currency", tokendata.currency);
//        newToken.set("image_url", tokendata.url_image); 
//		newToken.set("productUrl",tokendata.url_product);
//		newToken.set("sex",tokendata.extras.sex);
//		
////		$scope.findPointerObject("Warehouse", "Designers",
////								function(object){
////								},
////								function(object){
////								
////								})
//						
//		var Designer = Parse.Object.extend("Designers");
//		var query = new Parse.Query(Designer);
//		query.equalTo("name", "Warehouse");
//		query.first({
//		  success: function(object) {
//			  newToken.set("designer", object); 
//			  
//			  var Season = Parse.Object.extend("Seasons");
//			  
////			  if(object){
////			  	 //do the next query // 
////			  }
////			console.log(object.id);
////			console.log(object);
////			  
////			newToken.save(null, {
////				
////				  success: function(token) {
////				  
////				  },
////				
////				  error: function(token, error) {
////				  
////				  }
////
////			 });
//			  
//		  },
//		  error: function(error) {
//			  console.log(error)
//			alert("Error: " + error.code + " " + error.message);
//		  }
//			
//		});
//		var tokendata  = data.product[0];
//		
//		var Token = Parse.Object.extend("TestDatabase");
//        var newToken = new Token();
//        
//		newToken.set("name", tokendata.name); 
//        newToken.set("price", tokendata.price); 
//        newToken.set("url_image", tokendata.url_image); 
//		newToken.save(null, {
//
//			  success: function(token) {
//			  },
//
//			  error: function(token, error) {
//			  }
//
//		 });
		
//             newToken.set("index",newIndex); 
//         newToken.set("name", tokendata.name); 
//         newToken.set("price", tokendata.price); 
//		 var tokenImage  = new Image();
//		 tokenImage.src = tokendata.url_image;
//		
//		tokenImage.onload = function() {
//			console.log(getBase64Image(tokenImage));
//			var file = new Parse.File("token.png",tokenImage )
//			newToken.set("image",file);
//			
//			newToken.save(null, {
//
//				  success: function(token) {
//				  },
//
//				  error: function(token, error) {
//				  }
//
//			 });
//		};
		
//		$.getImageData({
//		  url: tokendata.url_image,
//		  success: function(image){
//			 
//			 var parseFile = new Parse.File('token.png', image);
//             newToken.set("image",parseFile);
//			newToken.save(null, {
//
//				  success: function(token) {
//				  },
//
//				  error: function(token, error) {
//				  }
//
//			 });
//			// Do something with the now local version of the image
//		  },
//		  error: function(xhr, text_status){
//			// Handle your error here
//		  }
//		});
//		var xhr = new XMLHttpRequest();
//			xhr.open('GET', 'blob:' + tokendata.url_image, true);
//			xhr.responseType = 'blob';
//			xhr.onload = function(e) {
//				console.log(e);
//			  if (this.status == 200) {
//				var myBlob = this.response;
////				  console.log("here")
//				// myBlob is now the blob that the object URL pointed to.
//			  }
//			};
//		 var tokenImage  = new Image();
//		 tokenImage.src = tokendata.url_image;
//		 var parseFile = new Parse.File("token.jpg", tokenImage);
//		 
//		 newToken.set("image",parseFile);
		
//		 newToken.save(null, {
//             
//              success: function(token) {
//              },
//             
//              error: function(token, error) {
//              }
//             
//         });
//         newToken.set("desc", $scope.token.desc); 
//         newToken.set("price", $scope.token.price);
//         newToken.set("productUrl", $scope.token.productUrl);
//        
//         newToken.set("designer",$scope.token.designer);
//         newToken.set("type",$scope.token.type); 
//         newToken.set("color",$scope.token.color); 
//         newToken.set("fabric",$scope.token.fabric);
//         newToken.set("season",$scope.token.season);
//         newToken.set("style",$scope.token.style);
//         newToken.set("pricerange",$scope.token.priceRange);
//         newToken.set("supercategory" ,$scope.token.superCategory); 
//         newToken.set("approved" ,$scope.token.approved);  
	
//    $scope.csvString = "Column 1,Column 2,Column 3,Column 4 " +'\n' + "1-1,1-2,1-3,1-4";
//    
//    $scope.results = Papa.parse($scope.csvString);
//    console.log($scope.results);
    
//    $scope.testScope = "the scope";
    
});

//if(!window.cfbs) window.cfbs = {};
//
//var drop = document.getElementById('drop');
//
//function handleDrop(e) {
//  e.stopPropagation();
//  e.preventDefault();
//  var files = e.dataTransfer.files;
//  var i,f;
//  for (i = 0, f = files[i]; i != files.length; ++i) {
//    var reader = new FileReader();
//    var name = f.name;
//    reader.onload = function(e) {
//      var data = e.target.result;
//      var cfb = CFB.read(data, {type:'binary'})
//      window.cfbs[name] = cfb;
//      var wb = parse_xlscfb(cfb);
//      var ws = wb.Sheets[wb.Directory[0]]
//      var csv = make_csv(ws);
//      var cmds = get_formulae(ws).join("\n");
//      if(out.innerText === undefined) out.textContent+=csv+"\n";
//      else out.innerText+=csv+"\n";
//
//    };
//    reader.readAsBinaryString(f);
//  }
//}
//
//function handleDragover(e) {
//  e.stopPropagation();
//  e.preventDefault();
//  e.dataTransfer.dropEffect = 'copy';
//}
//
//if(drop.addEventListener) {
//  drop.addEventListener('dragenter', handleDragover, false);
//  drop.addEventListener('dragover', handleDragover, false);
//  drop.addEventListener('drop', handleDrop, false);
//}