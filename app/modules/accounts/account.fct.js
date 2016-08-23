(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('AccountService', accountService);

    function accountService($http, $rootScope, $q, BASE_URL, StorageService, APIService) {
        return {
            login: login,
            logout: logout
        };

        function login(email, password) {
            var deferred = $q.defer();

            var data = {
                email: email,
                password: password
            };

            $rootScope.$emit('http_start', null);
            var request = makeRequest('login', data);

            request.then(
                function (response) {
                    $rootScope.$emit('http_complete', response);
                    deferred.resolve(response.data);
                },
                function (error) {
                    $rootScope.$emit('http_complete', error);
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
                function(data) {

                },
                function(error) {

                }
            );

            $http({
                url: BASE_URL + '/logout',
                method: 'GET',
                headers: {'Authorization': token}
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
                data: data
            });
        }
    }

})();