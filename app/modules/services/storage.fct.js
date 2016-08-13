(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('StorageService', StorageService);

    function StorageService(localStorageService) {
        function getToken() {
            return localStorageService.get('user_token');
        }

        return {
            getToken: getToken
        };
    }
})();