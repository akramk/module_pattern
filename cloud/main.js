Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});



/*After Delete of any token it will delete the lists of MyFavorites and MyArsenal*/
Parse.Cloud.afterDelete("MyTokens_Layer1", function(request) {
  query = new Parse.Query("MyFavorites");
    console.log(request.object.id);
  query.equalTo("layer1", {__type:"Pointer", className:"MyTokens_Layer1", objectId: request.object.id});
  query.find({
    success: function(myfavorites) {
      Parse.Object.destroyAll(myfavorites, {
        success: function() {console.log("Deletion done");},
        error: function(error) {
          console.error("Error deleting related tokens " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related tokens " + error.code + ": " + error.message);
    }
  });
    
    
 queryArsenal = new Parse.Query("MyArsenal");
    console.log(request.object.id);
  queryArsenal.equalTo("layer1", {__type:"Pointer", className:"MyTokens_Layer1", objectId: request.object.id});
  queryArsenal.find({
    success: function(myarsenal) {
      Parse.Object.destroyAll(myarsenal, {
        success: function() {console.log("Deletion done");},
        error: function(error) {
          console.error("Error deleting related tokens " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related tokens " + error.code + ": " + error.message);
    }
  });      
    
});


Parse.Cloud.afterDelete("MyTokens_Layer2", function(request) {
  query = new Parse.Query("MyFavorites");
    console.log(request.object.id);
  query.equalTo("layer2", {__type:"Pointer", className:"MyTokens_Layer2", objectId: request.object.id});
  query.find({
    success: function(myfavorites) {
      Parse.Object.destroyAll(myfavorites, {
        success: function() {console.log("Deletion done");},
        error: function(error) {
          console.error("Error deleting related tokens " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related tokens " + error.code + ": " + error.message);
    }
  });
    
    
  queryArsenal = new Parse.Query("MyArsenal");
    console.log(request.object.id);
  queryArsenal.equalTo("layer2", {__type:"Pointer", className:"MyTokens_Layer2", objectId: request.object.id});
  queryArsenal.find({
    success: function(myarsenal) {
      Parse.Object.destroyAll(myarsenal, {
        success: function() {console.log("Deletion done");},
        error: function(error) {
          console.error("Error deleting related tokens " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related tokens " + error.code + ": " + error.message);
    }
  });        
    
    
    
});

Parse.Cloud.afterDelete("MyTokens_Layer3", function(request) {
  query = new Parse.Query("MyFavorites");
    console.log(request.object.id);
  query.equalTo("layer3", {__type:"Pointer", className:"MyTokens_Layer3", objectId: request.object.id});
  query.find({
    success: function(myfavorites) {
      Parse.Object.destroyAll(myfavorites, {
        success: function() {console.log("Deletion done");},
        error: function(error) {
          console.error("Error deleting related tokens " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related tokens " + error.code + ": " + error.message);
    }
  });
    
 queryArsenal = new Parse.Query("MyArsenal");
    console.log(request.object.id);
  queryArsenal.equalTo("layer3", {__type:"Pointer", className:"MyTokens_Layer3", objectId: request.object.id});
  queryArsenal.find({
    success: function(myarsenal) {
      Parse.Object.destroyAll(myarsenal, {
        success: function() {console.log("Deletion done");},
        error: function(error) {
          console.error("Error deleting related tokens " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related tokens " + error.code + ": " + error.message);
    }
  });      
    
});

Parse.Cloud.afterDelete("MyTokens_Layer4", function(request) {
  query = new Parse.Query("MyFavorites");
    console.log(request.object.id);
  query.equalTo("layer4", {__type:"Pointer", className:"MyTokens_Layer4", objectId: request.object.id});
  query.find({
    success: function(myfavorites) {
      Parse.Object.destroyAll(myfavorites, {
        success: function() {console.log("Deletion done");},
        error: function(error) {
          console.error("Error deleting related tokens " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related tokens " + error.code + ": " + error.message);
    }
  });
    
    
     queryArsenal = new Parse.Query("MyArsenal");
    console.log(request.object.id);
  queryArsenal.equalTo("layer4", {__type:"Pointer", className:"MyTokens_Layer4", objectId: request.object.id});
  queryArsenal.find({
    success: function(myarsenal) {
      Parse.Object.destroyAll(myarsenal, {
        success: function() {console.log("Deletion done");},
        error: function(error) {
          console.error("Error deleting related tokens " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related tokens " + error.code + ": " + error.message);
    }
  });  
    
});
///////////////////////////////////////////////////////////


var Image = require("parse-image");
var MyFavorites = Parse.Object.extend("MyFavorites");
var MyArsenal = Parse.Object.extend("MyArsenal");

// Check if stopId is set, and enforce uniqueness based on the stopId column.
//Parse.Cloud.beforeSave("MyTokens_Layer1", function(request, response) {
//    //switch case the object
//
//});

//Parse.Cloud.afterSave("MyTokens_Layer1", function(request) {
//
//  var myToken = request.object;
//    
//  Parse.Cloud.httpRequest({
//    url: myToken.get("image").url()
//  }).then(function(response) {
//    var image = new Image();
//    return image.setData(response.buffer);
//  }).then(function(image) {
//      
//     return image.scale({
//        height: 300*(image.height()/image.width()),
//        width: 300
//     });
////    image.scale({
////        height: 300*(image.height()/image.width()),
////        width: 300,
////        success: function(image) {
////            // The image was scaled.
////            myToken.set("imageWidth", image.width());
////            myToken.set("imageHeight", image.height());
////            myToken.set("image",image);
////            myToken.save();
////        },
////        error: function(error) {
////            // The image could not be scaled.
////        }
////    });
//
//  }).then(function(image) {
//  // Get the bytes of the new image.
//    return image.data();
//  }).then(function(buffer) {
//      // Save the bytes to a new file.
//      var file = new Parse.File("image.jpg", { base64: data.toString("base64") });
//        myToken.set("imageWidth", image.width());
//        myToken.set("imageHeight", image.height());
//        myToken.set("image",file);
//        myToken.save();
////      return file.save();
//   });
//});

Parse.Cloud.afterSave("MyTokens_Layer1", function(request) {

  var myToken = request.object;
  Parse.Cloud.httpRequest({
    url: myToken.get("image").url()
  }).then(function(response) {
    var image = new Image();
    return image.setData(response.buffer);
  }).then(function(image) {
    myToken.set("imageWidth", image.width());
    myToken.set("imageHeight", image.height());
    myToken.save();
  })
});

//remove for now
//Parse.Cloud.beforeSave("MyTokens_Layer1", function(request,response) {
//  var myToken = request.object;
//  Parse.Cloud.httpRequest({
//    url: myToken.get("image").url()
//  }).then(function(response) {
//    var image = new Image();
//    return image.setData(response.buffer);
//  }).then(function(image){
//      return image.scale({height: 300*(image.height()/image.width()), width: 300});
//  }).then(function(image){
//      return image.data();
//  }).then(function(image){
//      var base64 = image.toString("base64");
//      var resized = new Parse.File("token.png", { base64: base64 });
//      return resized.save();
//  }).then(function(resized){
//      myToken.set("image", resized);
//  }).then(function(result) {
//    response.success();
//  }, function(error) {
//    response.error(error);
//  });
//  
//});

Parse.Cloud.afterSave("MyTokens_Layer2", function(request) {

  var myToken = request.object;
  Parse.Cloud.httpRequest({
    url: myToken.get("image").url()
  }).then(function(response) {
    var image = new Image();
    return image.setData(response.buffer);
  }).then(function(image) {
    myToken.set("imageWidth", image.width());
    myToken.set("imageHeight", image.height());
    myToken.save();
  })
});

Parse.Cloud.afterSave("MyTokens_Layer3", function(request) {

  var myToken = request.object;
  Parse.Cloud.httpRequest({
    url: myToken.get("image").url()
  }).then(function(response) {
    var image = new Image();
    return image.setData(response.buffer);
  }).then(function(image) {
    myToken.set("imageWidth", image.width());
    myToken.set("imageHeight", image.height());
    myToken.save();
  })
});

Parse.Cloud.afterSave("MyTokens_Layer4", function(request) {

  var myToken = request.object;
  Parse.Cloud.httpRequest({
    url: myToken.get("image").url()
  }).then(function(response) {
    var image = new Image();
    return image.setData(response.buffer);
  }).then(function(image) {
    myToken.set("imageWidth", image.width());
    myToken.set("imageHeight", image.height());
    myToken.save();
  })
});

Parse.Cloud.beforeSave("MyFavorites", function(request, response) {
    //switch case the object
    
    var layerName = "";
    
    if(request.object.get("layer1")){
        layerName = "layer1";
    }else if(request.object.get("layer2")){
        layerName = "layer2";
    }else if(request.object.get("layer3")){
        layerName = "layer3";
    }else if(request.object.get("layer4")){
        layerName = "layer4";
    }
    
    var query = new Parse.Query(MyFavorites);
    query.equalTo(layerName,request.object.get(layerName));
    query.equalTo("owner",request.object.get("owner"));
    query.first({
      success: function(object) {
        if (object) {
          response.error("token already exists in favorite.");
        } else {
          response.success();
        }
      },
      error: function(error) {
        response.error("Could not validate uniqueness for this object.");
      }
    });
});

Parse.Cloud.beforeSave("MyArsenal", function(request, response) {
    //switch case the object
    
    var layerName = "";
    
    if(request.object.get("layer1")){
        layerName = "layer1";
    }else if(request.object.get("layer2")){
        layerName = "layer2";
    }else if(request.object.get("layer3")){
        layerName = "layer3";
    }else if(request.object.get("layer4")){
        layerName = "layer4";
    }
    
    var query = new Parse.Query(MyArsenal);
    query.equalTo(layerName,request.object.get(layerName));
    query.equalTo("owner",request.object.get("owner"));
    query.first({
      success: function(object) {
        if (object) {
          response.error("token already exists in arsenal.");
        } else {
          response.success();
        }
      },
      error: function(error) {
        response.error("Could not validate uniqueness for this object.");
      }
    });
});

Parse.Cloud.define("addAdminRole", function(request, response) {
    var roleACL = new Parse.ACL();
    roleACL.setPublicReadAccess(true);
    var role = new Parse.Role("Administrator", roleACL);
    role.save();
    response.success("admin role added");
});

//Parse.Cloud.define("readThroughImageSize", function(request, response) {
////    for(var i =1; i <= 4 ; i++ ){
//        var token = Parse.Object.extend("MyTokens_Layer2");
//        var query = new Parse.Query(token);
//
//        query.find({
//          success: function(results) {
//            console.log("Successfully retrieved " + results.length + " tokens.");
//            // Do something with the returned Parse.Object values
////            console.log();
//            for (var i = 0; i < results.length; i++) { 
//              
//              var myToken = results[i];
//              Parse.Cloud.httpRequest({
//                url: myToken.get("image").url()
//              }).then(function(response) {
//                var image = new Image();
//                return image.setData(response.buffer);
//              }).then(function(image) {
//                console.log(image.width() + ',' + image.height());
//                myToken.set("imageWidth", image.width());
//                myToken.set("imageHeight", image.height());
//                myToken.save();
//              })
//            }
//              
//            response.success("success");
//          },
//          error: function(error) {
//            alert("Error: " + error.code + " " + error.message);
//          }
//        });
//    
////    }
//});

//Parse.Cloud.define("addUserToRole",function(request, response){
//    var roleACL = new Parse.ACL();
//    roleACL.setPublicReadAccess(true);
//    var role = new Parse.Role("Administrator",roleACL);
//    
////    var query = new Parse.Query(Parse.Role);
////    query.contains("name",)
////  response.success(request);
//    response.success("User added as an admin");
//});
