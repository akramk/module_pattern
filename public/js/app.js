//Split controller into module
var myApp = angular.module('myApp', ['ngRoute','ui.bootstrap','ngGrid']);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller : 'LoginController' 
  })
  .when('/main', {
    templateUrl: 'partials/main.html',
    controller : 'MainController'  
  })
  .when('/create', {
    templateUrl: 'partials/create.html',
    controller : 'CreateController'  
  })
  .when('/browse', {
    templateUrl: 'partials/browse.html',
    controller : 'BrowseController'  
  })
  .when('/import', {
    templateUrl: 'partials/import.html',
    controller : 'ImportController'  
  })
  .when('/avartar', {
    templateUrl: 'partials/avatar.html',
    controller : 'AvatarController'  
  })
  .when('/designer', {
    templateUrl: 'partials/designer.html',
    controller : 'DesignerController'  
  })
  .when('/token', {
    templateUrl: 'token/index.html',
    controller : 'TokenController'  
  })
});

//(function() {
//  var canvas = this.__canvas = new fabric.Canvas('c');
//  fabric.Object.prototype.transparentCorners = false;
//
//  var radius = 300;
//
//  fabric.Image.fromURL('img/combyne_logo_800px.png', function(img) {
//    img.scale(0.5).set({
//      left: 100,
//      top: 100,
//      angle: -15,
//      clipTo: function (ctx) {
//        ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
//      }
//    });
//    canvas.add(img).setActiveObject(img);
//  });
//
//  (function animate() {
//    fabric.util.animate({
//      startValue: Math.round(radius) === 50 ? 50 : 300,
//      endValue: Math.round(radius) === 50 ? 300 : 50,
//      duration: 1000,
//      onChange: function(value) {
//        radius = value;
//        canvas.renderAll();
//      },
//      onComplete: animate
//    });
//  })();
//})();
