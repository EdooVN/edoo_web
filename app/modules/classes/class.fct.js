(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('ClassService', classService);

    function classService($http, BASE_URL, $q, StorageService) {
        return {
            getClasses: getClasses
        };

        function getClasses() {
            var deferred = $q.defer();
            var request = makeRequest('classes');

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

        function makeRequest(url) {
            var requestUrl = BASE_URL + '/' + url;
            var token = StorageService.getToken();

            return $http({
                url: requestUrl,
                method: 'GET',
                headers: {'Authorization': token}
            });
        }
    }

})();