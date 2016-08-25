(function () {
    'use strict';

    angular.module('app.core')

        .controller('ListPostsController', function ($location, $stateParams, StorageService, PostService, ClassService, PageValues) {
            var mv = this;

            mv.data = PageValues;

            mv.listPost = [];
            mv.class_id = $stateParams.classId;

            if (!mv.class_id) {
                $location.path('/class');
            }

            PostService.getListPost(this.class_id).then(function (data) {
                mv.listPost = data.data.posts;
            }, function (error) {
                console.log(error);
            });
        });
})();
