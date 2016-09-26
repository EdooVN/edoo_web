(function () {
    'use strict';

    angular.module('app.services')
        .factory('PageSupportService', classService);

    function classService($q, StorageService, APIService) {
        return {
            submitSupport: submitSupport
        };

        function submitSupport(data) {
            var deferred = $q.defer();

            APIService.makeRequest({
                url: '/sendsupport',
                method: 'POST',
                data: data
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