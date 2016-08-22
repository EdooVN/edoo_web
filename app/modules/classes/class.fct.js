(function () {
    'use strict';

    angular.module('app.services')
        .factory('ClassService', classService);

    function classService($q, StorageService, APIService) {
        return {
            getClasses: getClasses
        };

        function getClasses() {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/classes',
                method: 'GET',
                headers: {'Authorization': token}
            }).then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }
    }

})();