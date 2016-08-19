(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('PostService', postService);

    function postService($http, $rootScope, BASE_URL, $q, StorageService) {
        return {
            getListPost: getListPost,
            getPost: getPost
        };

        function getListPost(class_id) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            $rootScope.$emit('http_start', null);
            $http({
                url: BASE_URL + '/posts/' + class_id,
                method: 'GET',
                headers: {'Authorization': token}
            }).then(
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

        function getPost(post_id) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            $rootScope.$emit('http_start', null);
            $http({
                url: BASE_URL + '/post/' + post_id,
                method: 'GET',
                headers: {'Authorization': token}
            }).then(
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
    }

})();