(function () {
    'use strict';

    angular
        .module('app.config', [])
        .config(configs)
        .run(runs);

    function configs($httpProvider) {
        $httpProvider.interceptors.push('HTTPInterceptor');
    }

    function runs($rootScope, PageValues, StorageService, AuthService, ClassService) {
        $rootScope.$on('$routeChangeStart', function () {
            PageValues.loading = true;

            if (!AuthService.isAuthorized()) {
                $rootScope.$emit('unauthorized', null);
            }
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            PageValues.loading = false;
        });

        $rootScope.$on('http_start', function (event, data) {
            PageValues.loading = true;
        });

        $rootScope.$on('http_complete', function (event, data) {
            PageValues.loading = false;
        });

        $rootScope.$on('unauthorized', function (event, data) {
            StorageService.clearAll();
            updateValues();
        });

        $rootScope.$on('loginSuccess', function (event, data) {
            StorageService.setUserData(data.user);
            StorageService.setToken(data.token);

            updateValues();
        });

        function initData() {
            if (!AuthService.isAuthorized()) {
                return false;
            }

            var classes = StorageService.getClasses() || false;
            if (!classes) {
                ClassService.getClasses().then(
                    function (data) {
                        var classes = data.data.classes;
                        StorageService.setClasses(classes);
                    }
                );
            }

            return true;
        }

        function updateValues() {
            var token = StorageService.getToken();

            PageValues.isAuthenticated = AuthService.isAuthorized();
            PageValues.token = token;
            PageValues.user = StorageService.getUserData();
        }

        initData();
        updateValues();
    }
})();