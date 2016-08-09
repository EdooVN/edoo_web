(function ($) {
    'use strict';

    const host_API = 'http://128.199.226.234:2344';

    var app = angular.module('edooApp', ['ngRoute', 'ngCookies']);

    app.controller('MainController', function ($rootScope, $cookies) {
        this.setAuthenticated = function () {
            this.inAuthenticated = true;
        };

        this.getUserData = function () {
            return $cookies.getObject('user_data') || {name: ''};
        };

        this.setUserData = function (user) {
            this.user = user;
            $cookies.putObject('user_data', user);
        };

        this.getToken = function () {
            return this.token = $cookies.get('user_token') || false;
        };

        this.setToken = function (token) {
            this.token = token;
            $cookies.put('user_token', token);
        };

        this.destroyToken = function () {
            $cookies.put('user_token', null);
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

    app.controller('NavbarController', function ($http, $cookies, $rootScope) {
        this.login = function () {
            $('#modalFormLogin').modal('show');
        };

        this.logout = function () {
            var api_url = host_API + '/logout';
            var token = $cookies.get('user_token') || false;
            console.log(token);
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
        this.email = '';// To test
        this.password = '';

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
