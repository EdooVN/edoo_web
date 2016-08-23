(function () {
    'use strict';

    angular.module('app.services')
        .factory('EventService', EventService)
        .run(runs);

    function EventService(StorageService) {
    }

    function runs($rootScope, $location, PageValues, StorageService, AuthService, ClassService) {
        $rootScope.$on('unauthorized', function (event, args) {
            StorageService.clearAll();
            updateValues();
            return $location.path('/');
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