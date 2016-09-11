(function () {
    'use strict';

    angular.module('app.services')
        .factory('EventService', EventService)
        .run(runs);

    function EventService(StorageService) {
    }

    function runs($rootScope, $state, PageValues, StorageService, AuthService) {
        $rootScope.$on('unauthorized', function (event, args) {
            StorageService.clearAll();
            updateValues();
            return $state.go('login');
        });

        $rootScope.$on('loginSuccess', function (event, args) {
            StorageService.setUserData(args.data.user);
            StorageService.setToken(args.data.token);

            updateValues();
        });

        $rootScope.$on('logoutSuccess', function (event, args) {
            StorageService.clearAll();

            updateValues();
        });

        function updateValues() {
            var token = StorageService.getToken();

            PageValues.isAuthenticated = AuthService.isAuthorized();
            PageValues.token = token;
            PageValues.user = StorageService.getUserData();
        }

        updateValues();
    }
})();