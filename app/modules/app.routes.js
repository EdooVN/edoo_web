(function () {
    'use strict';

    angular
        .module('app.routes', ['ui.router'])
        .config(config);

    // function config($routeProvider) {
    //     $routeProvider
    //         .when('/', {
    //             redirectTo: '/welcome'
    //         })
    //         .when('/welcome', {
    //             templateUrl: 'templates/pages/welcome.html',
    //             controller: 'WelcomeController'
    //         })
    //         .when('/login', {
    //             templateUrl: 'templates/accounts/login.html',
    //             controller: 'LoginController',
    //             controllerAs: 'loginCtrl'
    //         })
    //         .when('/logout', {
    //             templateUrl: 'templates/accounts/logout.html',
    //             controller: 'LogoutController',
    //             controllerAs: 'logoutCtrl'
    //         })
    //         .when('/class', {
    //             templateUrl: 'templates/classes/index.html',
    //             controller: 'ClassIndexController',
    //             controllerAs: 'classCtrl'
    //         })
    //         .when('/class/:id', {
    //             templateUrl: 'templates/posts/index.html',
    //             controller: 'ListPostsController',
    //             controllerAs: 'postsCtrl'
    //         })
    //         .when('/class/:class/post/:post', {
    //             templateUrl: 'templates/posts/details.html',
    //             controller: 'PostDetailsController',
    //             controllerAs: 'postCtrl'
    //         })
    //         .when('/class/:class/newPost', {
    //             templateUrl: 'templates/posts/create.html',
    //             controller: 'CreatePostController',
    //             controllerAs: 'createPostCtrl'
    //         })
    // }

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when('/', '/welcome')
            .otherwise('/404');

        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'templates/pages/welcome.html',
                controller: 'WelcomeController'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/accounts/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'templates/accounts/logout.html',
                controller: 'LogoutController',
                controllerAs: 'logoutCtrl'
            })
            .state('class', {
                url: '/class',
                views: {
                    '': {
                        templateUrl: 'templates/layouts/master.html'
                    },
                    'sidebar@class': {
                        templateUrl: 'templates/classes/sidebar.html'
                    },
                    'content@class': {
                        templateUrl: 'templates/classes/list-class.html',
                        controller: 'ClassIndexController',
                        controllerAs: 'classCtrl'
                    }
                }
            })
            .state('posts', {
                url: '/class/{classId}',
                views: {
                    '': {
                        templateUrl: 'templates/layouts/master.html'
                    },
                    'sidebar@posts': {
                        templateUrl: 'templates/classes/sidebar.html'
                    },
                    'content@posts': {
                        templateUrl: 'templates/posts/list-post.html',
                        controller: 'ListPostsController',
                        controllerAs: 'postsCtrl'
                    }
                }
            })
            .state('posts.detail', {
                url: '/post/{postId}',
                views: {
                    'content@posts': {
                        templateUrl: 'templates/posts/details.html',
                        controller: 'PostDetailsController',
                        controllerAs: 'postCtrl'
                    }
                }
            })

    }
})();