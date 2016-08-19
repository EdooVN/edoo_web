(function () {
    'use strict';

    angular.module('app.services')
        .factory('StorageService', StorageService);

    function StorageService(localStorageService) {
        return {
            getToken: getToken,
            setToken: setToken,
            setUserData: setUserData,
            getUserData: getUserData,
            setClasses: setClasses,
            getClasses: getClasses,
            clearAll: clearAll
        };

        //////////

        function getToken() {
            return localStorageService.get('user_token');
        }

        function setToken(token) {
            return localStorageService.set('user_token', token);
        }

        function setUserData(user) {
            return localStorageService.set('user_data', user);
        }

        function getUserData() {
            return localStorageService.get('user_data');
        }

        function setClasses(classes) {
            return localStorageService.set('user_classes', classes);
        }

        function getClasses() {
            return localStorageService.get('user_classes') || [];
        }


        function clearAll() {
            return localStorageService.clearAll();
        }
    }
})();