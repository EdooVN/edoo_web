(function () {
    'use strict';

    angular.module('app.core')

        .controller('ListPostsController', function ($location, $routeParams, StorageService, PostService, ClassService) {
            var mv = this;

            var token = StorageService.getToken();

            if (!token) {
                $location.path('/');
            }

            this.listPost = [];
            this.class_id = $routeParams.id;
            this.listClass = [];
            PostService.getListPost(this.class_id).then(function (data) {
                mv.listPost = data.data.posts;
            }, function (error) {
                console.log(error);
            });

            ClassService.getClasses().then(
                function (data) {
                    mv.listClass = data.data.classes;
                }, function (error) {
                    console.log(error);
                }
            );
        });
})();
