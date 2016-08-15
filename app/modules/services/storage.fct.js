(function () {
    'use strict';

    angular.module('app.services')
        .factory('StorageService', StorageService);

    function StorageService(localStorageService) {
        return {
            getToken: getToken
        };

        //////////

        function getToken() {
            return localStorageService.get('user_token');
        }
    }
})();