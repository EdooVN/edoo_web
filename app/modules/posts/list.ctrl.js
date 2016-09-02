(function () {
    'use strict';

    angular.module('app.core')

        .controller('ListPostsController', function ($location, $stateParams, StorageService, PostService, ClassService, PageValues) {
            var mv = this;

            PageValues.title = 'Lớp ...';

            mv.data = PageValues;

            mv.listPost = [];
            mv.class_id = $stateParams.classId;
            mv.class = {};

            if (!mv.class_id) {
                $location.path('/class');
            }

            PostService.getListPost(this.class_id).then(function (data) {
                mv.listPost = data.data.posts;
                mv.class = data.data;

                PageValues.title = 'Lớp ' + mv.class.name;
            }, function (error) {
                console.log(error);
            });
        });
})();
