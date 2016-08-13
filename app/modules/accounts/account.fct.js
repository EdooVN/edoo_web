(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('AccountService', accountService);

    function accountService($http, BASE_URL, $q, StorageService) {

        function login(email, password) {
            var deferred = $q.defer();

            var data = {
                email: email,
                password: password
            };

            var request = makeRequest('login', data);

            request.then(
                function (response) {
                    deferred.resolve(response.data);
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

            $http({
                url: BASE_URL + '/logout',
                method: 'GET',
                headers: {'Authorization': token},
                cache: true
            }).then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (error) {
                    deferred.resolve(error);
                }
            );

            return deferred.promise;
        }

        function makeRequest(url, data) {
            var requestUrl = BASE_URL + '/' + url;

            return $http({
                url: requestUrl,
                method: 'POST',
                data: data,
                cache: true
            });
        }

        return {
            login: login,
            logout: logout
        };
    }

})();