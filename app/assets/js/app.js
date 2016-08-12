(function ($) {
    'use strict';

    const host_API = 'http://api.uetf.me';

    var app = angular.module('edooApp', ['ngRoute', 'ngCookies', 'LocalStorageModule']);

    app.config(function ($routeProvider) {
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
                controllerAs: 'login'
            })
            .when('/class', {
                templateUrl: 'templates/class/index.html',
                controller: 'ClassController',
                controllerAs: 'classCtrl'
            })
            .when('/class/:id', {
                templateUrl: 'templates/class/posts.html',
                controller: 'PostController',
                controllerAs: 'postCtrl'
            })

    });

    app.factory('myCache', function ($cacheFactory) {
        return $cacheFactory('myData');
    });

    app.config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('edoo');
    });

    app.config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setDefaultToCookie(false);
    });

    app.controller('MainController', function ($rootScope, localStorageService) {
        this.setAuthenticated = function () {
            this.inAuthenticated = true;
        };

        this.getUserData = function () {
            return localStorageService.get('user_data') || {name: ''};
        };

        this.setUserData = function (user) {
            this.user = user;
            localStorageService.set('user_data', user);
        };

        this.getToken = function () {
            return this.token = localStorageService.get('user_token') || false;
        };

        this.setToken = function (token) {
            this.token = token;
            localStorageService.set('user_token', token);
        };

        this.destroyToken = function () {
            localStorageService.set('user_token', null);
        };

        this.logout = function () {
            this.inAuthenticated = false;
            this.destroyToken();
        };

        var main = this;
        $rootScope.$on('loginSuccess', function (event, data) {
            main.setAuthenticated();
            main.setUserData(data.user);
            main.setToken(data.token);

            $('#modalFormLogin').modal('hide');
        });

        $rootScope.$on('logoutSuccess', function (event, data) {
            main.logout();
        });

        // Init
        this.inAuthenticated = false;
        this.user = this.getUserData();
        this.token = this.getToken();

        if (this.token) {
            this.inAuthenticated = true;
        }
    });

    app.controller('NavbarController', function ($http, $location, $rootScope, localStorageService) {
        this.logout = function () {
            var api_url = host_API + '/logout';
            var token = localStorageService.get('user_token') || false;
            $http({
                method: 'GET',
                url: api_url,
                headers: {'Authorization': token}
            }).then(
                function (response) {
                    var data = response.data;

                    if (200 === data.statusCode) {
                        $rootScope.$emit('logoutSuccess');
                        $location.path('/');
                    }
                },
                function (error) {
                    console.log(error);
                }
            );
        };
    });

    app.controller('LoginController', function ($http, $rootScope, $location, localStorageService) {
        this.signIn = function () {
            var data = {
                email: this.email,
                password: this.password
            };

            var api_url = host_API + '/login';

            $http({
                method: 'POST',
                url: api_url,
                data: data
            }).then(function (response) {
                var data = response.data;

                if (200 === data.statusCode) {
                    $rootScope.$emit('loginSuccess', data.data);

                    $location.path('/class');
                }
            }, function (response) {
                console.log(response);
            });
        };

        var token = localStorageService.get('user_token');

        if (token) {
            return $location.path('/');
        }

        this.email = 'quytm_58@vnu.edu.vn';// To test
        this.password = '123456';
    });

    app.controller('ClassController', function ($scope, localStorageService, $location, $http) {
        var token = localStorageService.get('user_token');
        if (!token) {
            $location.path('/');
        }

        this.listClass = [];
        var thisCtrl = this;

        $http({
            method: 'GET',
            url: host_API + '/classes',
            headers: {'Authorization': token}
        }).then(function (response) {
            var data = response.data;

            if (200 === data.statusCode) {
                thisCtrl.listClass = data.data.classes;
            }
        }, function (error) {
            console.log(error);
        });
    });

    app.controller('WelcomeController', function ($scope, localStorageService, $location) {
        var token = localStorageService.get('user_token');

        if (token) {
            $location.path('/class');
        }
    });

    app.controller('PostController', function ($scope, localStorageService, $location, $routeParams, $http) {
        var thisCtrl = this;

        var token = localStorageService.get('user_token');

        if (!token) {
            $location.path('/class');
        }

        this.listPost = [];

        var class_id = $routeParams.id;
        $http({
            method: 'GET',
            url: host_API + '/posts/' + class_id,
            headers: {'Authorization': token}
        }).then(function (response) {
            var data = response.data;

            if (200 === data.statusCode) {
                thisCtrl.listPost = data.data.posts;
            }
        }, function (error) {
            console.log(error);
        });
    });
})(jQuery);
