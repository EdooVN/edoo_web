(function () {
    'use strict';

    angular.module('app.services')
        .factory('AuthService', AuthService);

    function AuthService(StorageService) {
        return {
            isAuthorized: isAuthorized
        };

        function isAuthorized() {
            var token = StorageService.getToken();

            return Boolean(token);
        }
    }
})();