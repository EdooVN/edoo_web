'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', function ($scope) {

    }])

    .controller('mainController', ['$scope', function ($scope) {

        // BUTTONS ======================

        // define some random object
        $scope.bigData = {};

        $scope.bigData.breakfast = false;
        $scope.bigData.lunch = false;
        $scope.bigData.dinner = false;

        // COLLAPSE =====================
        $scope.isCollapsed = false;

    }]);
