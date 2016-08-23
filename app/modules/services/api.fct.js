(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('APIService', APIService);

    function APIService($http, $q, BASE_URL) {
        return {
            makeRequest: makeRequest
        };

        function makeRequest(config) {
            var deferred = $q.defer();

            config = config || {};
            config.url = BASE_URL + config.url;

            $http(config).then(
                function (response) {
                    deferred.resolve(response);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }
    }
})();