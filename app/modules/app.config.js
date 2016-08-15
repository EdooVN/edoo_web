(function () {
    'use strict';

    angular
        .module('app.config', [])
        .config(configs)
        .run(runs);

    function configs() {

    }

    function runs($rootScope, PageValues, StorageService) {
        updateValues();

        $rootScope.$on('$routeChangeStart', function () {
            PageValues.loading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            PageValues.loading = false;
        });

        $rootScope.$on('logoutSuccess', function (event, data) {
            StorageService.clearAll();
            updateValues();
        });

        $rootScope.$on('loginSuccess', function (event, data) {
            StorageService.setUserData(data.user);
            StorageService.setToken(data.token);

            updateValues();
        });

        function updateValues() {
            var token = StorageService.getToken();

            PageValues.isAuthenticated = Boolean(token);
            PageValues.token = token;
            PageValues.user = StorageService.getUserData();
        }
    }
})();