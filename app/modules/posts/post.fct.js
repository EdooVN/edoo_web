(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('PostService', postService);

    function postService($http, BASE_URL, $q, StorageService) {
        function getListPost(class_id) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            $http({
                url: BASE_URL + '/posts/' + class_id,
                method: 'GET',
                headers: {'Authorization': token},
                cache: true
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

        return {
            getListPost: getListPost
        };
    }

})();