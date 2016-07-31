'use strict';

angular.module('myApp', ['ngRoute', 'ui.bootstrap'])

    .controller('timeController', function ($scope) {
        var updateClock = function () {
            $scope.time = new Date();
        };

        setInterval(function () {
            $scope.$apply(updateClock());
        }, 1000);

        $scope.counter = 0;
        $scope.add = function () {
            $scope.counter += 1;
        }
    })

    .run(function ($rootScope, $http) {
        $rootScope.name = 'zai';
        $http.get('http://edoo.dev/list').then(function (response) {
            $rootScope.list = response.data;
        })
    })