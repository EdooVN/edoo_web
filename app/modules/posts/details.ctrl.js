(function () {
    'use strict';

    angular.module('app.core')

        .controller('PostDetailsController', function ($scope, localStorageService, $location, $routeParams, PostService) {
            var vm = this;

            var token = localStorageService.get('user_token');

            if (!token) {
                $location.path('/');
            }

            this.post = {};
            this.class_id = $routeParams.class;
            this.post_id = $routeParams.post;
            this.listPosts = [];

            PostService.getPost(this.post_id).then(function (data) {
                vm.post = data.data;
            }, function (error) {
                console.log(error);
            });

            PostService.getListPost(this.class_id).then(function (data) {
                vm.listPosts = data.data.posts;
            }, function (error) {
                console.log(error);
            });
        });
})();
