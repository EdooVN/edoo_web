(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('PostService', postService);

    function postService($http, $rootScope, $q, BASE_URL, StorageService) {
        return {
            getListPost: getListPost,
            getPost: getPost,
            createPost: createPost,
            comment: comment,
            vote: vote
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

        function comment(data) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            $http({
                url: BASE_URL + '/cmt',
                method: 'POST',
                data: data,
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

        function vote(data) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            $http({
                url: BASE_URL + '/votepost',
                method: 'POST',
                data: data,
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

        function createPost(data) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            $http({
                url: BASE_URL + '/post',
                method: 'POST',
                data: data,
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