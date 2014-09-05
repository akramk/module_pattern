/**
 * Created by MahabubAkram on 8/29/2014.
 */
angular.module('plunker', ['angularCharts']);

var chartsModule = angular.module('plunker', ['angularCharts']);

chartsModule.controller("MainCtrl",function($scope){

    $scope.config = {
        "labels": false,
        "title": "Products",
        "legend": {
            "display": true,
            "position": "right"
        },
        "innerRadius": "",
        "lineLegend": "lineEnd"
    };

    $scope.data = {
        series: [
            "Sales",
            "Income",
            "Expense"
        ],
        data: [{
            x: "Laptops",
            y: [100, 500, 0],
            tooltip: "this is tooltip"
        }, {
            x: "Desktops",
            y: [300, 100, 100]
        }, {
            x: "Mobiles",
            y: [351]
        }, {
            x: "Tablets",
            y: [54, 0, 879]
        }]
    };
    console.log($scope.data);



});


/*function MainCtrl($scope) {
    $scope.config = {
        "labels": false,
        "title": "Products",
        "legend": {
            "display": true,
            "position": "right"
        },
        "innerRadius": "",
        "lineLegend": "lineEnd"
    };

    $scope.data = {
        series: [
            "Sales",
            "Income",
            "Expense"
        ],
        data: [{
            x: "Laptops",
            y: [100, 500, 0],
            tooltip: "this is tooltip"
        }, {
            x: "Desktops",
            y: [300, 100, 100]
        }, {
            x: "Mobiles",
            y: [351]
        }, {
            x: "Tablets",
            y: [54, 0, 879]
        }]
    };
    console.log($scope.data);
}*/