(function () {
    'use strict';

    angular.module('app.core')

        .controller('ListPostsController', function ($state, $stateParams, StorageService, PostService, ClassService, PageValues, BreadCrumbsService) {
            var mv = this;

            PageValues.title = 'Lớp ...';

            mv.data = PageValues;

            mv.listPost = [];
            mv.class_id = $stateParams.classId;
            mv.class = {};

            if (!mv.class_id) {
                $state.go('class');
            }

            PostService.getListPost(this.class_id).then(function (data) {
                mv.listPost = data.data.posts;
                mv.class = data.data;

                PageValues.title = 'Lớp ' + mv.class.name;

                var breadcrumbs = [
                    {href: $state.href('class'), title: 'Danh sách lớp'},
                    {title: mv.class.name}
                ];

                BreadCrumbsService.update(breadcrumbs);
            }, function (error) {
                NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng tải lại trang.');
            });
        });
})();
