(function () {
    'use strict';

    angular.module('app.services')
        .factory('ClassService', classService);

    function classService($q, APIService) {
        return {
            getClasses: getClasses,
            getTopUsers: getTopUsers
        };

        function getClasses() {
            var deferred = $q.defer();

            APIService.makeRequestAuth({
                url: '/classes',
                method: 'GET',
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

        function getTopUsers(class_id) {
            var deferred = $q.defer();

            APIService.makeRequestAuth({
                url: '/classes/' + class_id,
                method: 'GET',
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