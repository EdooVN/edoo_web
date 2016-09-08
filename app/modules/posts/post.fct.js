(function () {
    'use strict';

    angular.module('app.services')
        .factory('PostService', postService);

    function postService($q, StorageService, APIService) {
        return {
            getListPost: getListPost,
            getPost: getPost,
            createPost: createPost,
            comment: comment,
            votePost: votePost,
            deletePost: deletePost,
            voteComment: voteComment,
            devoteComment: devoteComment,
            solve: solve
        };

        function getListPost(class_id) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/posts/' + class_id,
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

        function getPost(post_id) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/post/' + post_id,
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

        function comment(data) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/cmt',
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

        function votePost(data) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/votepost',
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

        function voteComment(data) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/votecmt',
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

        function devoteComment(data) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/devotecmt',
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

        function solve(comment_id) {
            var deferred = $q.defer();

            var data = {
                comment_id: comment_id + ''
            };

            APIService.makeRequestAuth({
                url: '/solve',
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

        function createPost(data) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/post',
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

        function deletePost(post_id) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/deletepost',
                method: 'POST',
                data: {post_id: post_id},
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