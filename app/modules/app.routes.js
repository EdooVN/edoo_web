(function () {
    'use strict';

    angular
        .module('app.routes', ['ui.router'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when('/', '/welcome')
            .otherwise('/');

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
            .state('profile', {
                url: '/profile',
                controller: 'ProfileController'
            })
            .state('profile.edit', {
                url: '/edit',
                controller: 'UpdateProfileController'
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
                url: '/class',
                views: {
                    '': {
                        templateUrl: 'templates/layouts/master.html'
                    },
                    'sidebar@posts': {
                        templateUrl: 'templates/posts/sidebar.html',
                        controller: 'SidebarController',
                        controllerAs: 'sidebarCtrl'
                    }
                }
            })
            .state('posts.list', {
                url: '/{classId}',
                views: {
                    'content@posts': {
                        templateUrl: 'templates/posts/list-post.html',
                        controller: 'ListPostsController',
                        controllerAs: 'postsCtrl'
                    }
                }
            })
            .state('posts.list.detail', {
                url: '/post/{postId}',
                views: {
                    'content@posts': {
                        templateUrl: 'templates/posts/details.html',
                        controller: 'PostDetailsController',
                        controllerAs: 'postCtrl'
                    }
                }
            })
            .state('posts.list.create', {
                url: '/create',
                views: {
                    'content@posts': {
                        templateUrl: 'templates/posts/create.html',
                        controller: 'CreatePostController',
                        controllerAs: 'createPostCtrl'
                    }
                }
            });
    }
})();