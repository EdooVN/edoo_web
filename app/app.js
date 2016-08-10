(function ($) {
    'use strict';

    const host_API = 'http://api.uetf.me';

    var app = angular.module('edooApp', ['ngRoute', 'ngCookies', 'LocalStorageModule']);

    app.factory('myCache', function ($cacheFactory) {
        return $cacheFactory('myData');
    });

    app.config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('edoo_');
    });

    app.config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setDefaultToCookie(false);
    });

    app.controller('MainController', function ($rootScope, myCache, localStorageService) {
        var lsKeys = localStorageService.keys();
        console.log(lsKeys);

        this.setAuthenticated = function () {
            this.inAuthenticated = true;
        };

        this.getUserData = function () {
            return localStorageService.get('user_data') || {name: ''};
        };

        this.setUserData = function (user) {
            this.user = user;
            localStorageService.set('user_data', user);

            console.log(localStorageService.get('user_data'));

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

        console.log(this.token);

        if (this.token) {
            this.inAuthenticated = true;
        }
    });

    app.controller('NavbarController', function ($http, myCache, $rootScope, localStorageService) {
        this.login = function () {
            $('#modalFormLogin').modal('show');
        };

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
                    }
                },
                function (error) {
                    console.log(error);
                }
            );
        };
    });

    app.controller('LoginController', function ($http, $rootScope) {
        this.email = 'tutv_58@vnu.edu.vn';// To test
        this.password = '123456';

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
                }
            }, function (response) {
                console.log(response);
            });
        };
    });
})(jQuery);
