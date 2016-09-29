(function () {
    'use strict';

    angular.module('app.core')
        .controller('SidebarClassController', function ($state, $stateParams, PostService, ClassService, PageValues, BreadCrumbsService, NotificationService) {
            var mv = this;

            mv.class_id = $stateParams.classId;
            mv.getTopUsers = getTopUsers;

            function getTopUsers() {
                ClassService.getTopUsers(mv.class_id)
                    .then(
                        function (response) {
                            console.log(response);
                        },
                        function (error) {
                            NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng tải lại trang.');
                        }
                    )
            }
        });
})();
