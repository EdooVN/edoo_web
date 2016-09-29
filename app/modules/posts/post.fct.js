(function () {
    'use strict';

    angular.module('app.services')
        .factory('PostService', postService);

    function postService($q, StorageService, APIService) {
        return {
            getListPost: getListPost,
            getPost: getPost,
            createPost: createPost,
            updatePost: updatePost,
            comment: comment,
            votePost: votePost,
            deletePost: deletePost,
            voteComment: voteComment,
            devoteComment: devoteComment,
            solve: solve,
            getListExercise: getListExercise,
            downloadAllExercise: downloadAllExercise
        };

        function getListPost(class_id, page) {
            var deferred = $q.defer();
            var page_number = page || 1;

            APIService.makeRequestAuth({
                url: '/posts/' + class_id + '/page/' + page_number,
                method: 'GET'
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

            APIService.makeRequestAuth({
                url: '/post/' + post_id,
                method: 'GET'
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

        function votePost(post_id, type) {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            var data = {
                post_id: post_id,
                content: type + ''
            };

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
                comment_id: comment_id
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

        function updatePost(data) {
            var deferred = $q.defer();

            APIService.makeRequestAuth({
                url: '/updatepost',
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

        function getListExercise(post_id) {
            var deferred = $q.defer();

            APIService.makeRequestAuth({
                url: '/checkevent/' + post_id,
                method: 'GET'
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

        function downloadAllExercise(post_id) {
            var deferred = $q.defer();

            APIService.makeRequestAuth({
                url: '/geteventfiles/' + post_id,
                method: 'GET'
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