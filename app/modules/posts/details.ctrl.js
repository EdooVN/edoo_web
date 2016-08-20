(function () {
    'use strict';

    angular.module('app.core')

        .controller('PostDetailsController', function ($scope, localStorageService, $location, $routeParams, PostService, PageValues) {
            var vm = this;

            var token = localStorageService.get('user_token');

            if (!token) {
                $location.path('/');
            }

            vm.data = PageValues;

            vm.post = {};
            vm.class_id = $routeParams.class;
            vm.post_id = $routeParams.post;
            vm.listPosts = [];
            vm.comment = comment;
            vm.vote = vote;

            PostService.getPost(this.post_id).then(function (data) {
                var post = data.data;
                var class_id = post.class_id;
                if (class_id !== vm.class_id) {
                    $location.path('/class/' + class_id + '/post/' + post.id);
                }
                vm.post = post;
            }, function (error) {
                console.log(error);
            });

            PostService.getListPost(this.class_id).then(function (data) {
                vm.listPosts = data.data.posts;
            }, function (error) {
                console.log(error);
            });

            function comment() {
                var data = {
                    post_id: vm.post_id,
                    content: vm.answer,
                    is_incognito: false
                };

                PostService.comment(data).then(
                    function (data) {
                        vm.answer = '';
                        var new_comment = data.data;
                        vm.post.comments.push(new_comment);
                    },
                    function (error) {
                        console.log(error);
                    }
                )
            }

            function vote(type) {
                var data = {
                    post_id: vm.post_id,
                    content: type
                };

                PostService.vote(data).then(
                    function (data) {
                        var vote_count = data.data.vote_count;
                    },
                    function (error) {
                        console.log(error);
                    }
                )
            }
        });
})();
