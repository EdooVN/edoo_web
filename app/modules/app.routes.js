(function () {
    'use strict';

    angular
        .module('app.routes', ['ngRoute'])
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/welcome'
            })
            .when('/welcome', {
                templateUrl: 'templates/pages/welcome.html',
                controller: 'WelcomeController'
            })
            .when('/login', {
                templateUrl: 'templates/users/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            })
            .when('/class', {
                templateUrl: 'templates/classes/index.html',
                controller: 'ClassIndexController',
                controllerAs: 'classCtrl'
            })
            .when('/class/:id', {
                templateUrl: 'templates/posts/index.html',
                controller: 'ListPostsController',
                controllerAs: 'postsCtrl'
            })
            .when('/class/:class/post/:post', {
                templateUrl: 'templates/posts/details.html',
                controller: 'PostDetailsController',
                controllerAs: 'postCtrl'
            })
    }
})();