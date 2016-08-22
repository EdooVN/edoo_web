(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('ClassService', classService);

    function classService($http, $rootScope, $q, BASE_URL, StorageService) {
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
                    if (error.status == 401) {
                        $(window).trigger('logout');
                    }
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