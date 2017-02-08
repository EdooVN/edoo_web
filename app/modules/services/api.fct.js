(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'https://edoo.vn/api')
        .factory('APIService', APIService);

    function APIService($http, $q, BASE_URL, StorageService, Upload, $rootScope) {
        return {
            makeRequest: makeRequest,
            makeRequestAuth: makeRequestAuth,
            upload: upload
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

        function makeRequestAuth(config) {
            var token = StorageService.getToken();
            config.headers = {'Authorization': token};

            return makeRequest(config);
        }

        function upload(url, file) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            Upload
                .upload({
                    url: BASE_URL + url,
                    data: {file: file},
                    headers: {"Authorization": token}
                })
                .then(
                    function (response) {
                        deferred.resolve(response);
                    },
                    function (error) {
                        deferred.reject(error);
                    },
                    function (event) {
                        $rootScope.$emit('progressEventUpload', event);
                    }
                );

            return deferred.promise;
        }
    }
})();