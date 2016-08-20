(function () {
    'use strict';

    angular.module('app.core')

        .controller('CreatePostController', function ($location, $routeParams, StorageService, PostService, ClassService, PageValues) {
            var mv = this;

            var token = StorageService.getToken();

            if (!token) {
                $location.path('/');
            }

            mv.data = PageValues;
            mv.class_id = $routeParams.id;

        });
})();
