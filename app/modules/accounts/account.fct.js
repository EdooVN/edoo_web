(function () {
    'use strict';

    angular.module('app.services')
        .factory('AccountService', accountService);

    function accountService($q, StorageService, APIService) {
        return {
            login: login,
            logout: logout
        };

        function login(email, password) {
            var deferred = $q.defer();

            var dataPOST = {
                email: email,
                password: password
            };

            APIService.makeRequest({
                url: '/login',
                method: 'POST',
                data: dataPOST
            }).then(
                function (data) {
                    deferred.resolve(data);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/logout',
                method: 'GET',
                headers: {'Authorization': token}
            }).then(
                function (data) {
                    deferred.resolve(data);
                },
                function (error) {
                    deferred.resolve(error);
                }
            );

            return deferred.promise;
        }
    }

})();