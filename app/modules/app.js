(function () {
    'use strict';

    var app = angular.module('app', ['app.routes', 'app.localStorage', 'app.core', 'app.services'])

        .controller('MainController', function ($rootScope, localStorageService) {
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
})();