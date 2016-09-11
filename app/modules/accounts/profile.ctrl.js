(function () {
    'use strict';

    angular.module('app.core')
        .controller('ProfileController', function ($state, PageValues, AccountService, NotificationService, BreadCrumbsService) {
            var mv = this;

            PageValues.title = 'Thông tin tài khoản';

            mv.account = false;
            mv.update = update;
            mv.openEdit = openEdit;
            mv.closeEdit = closeEdit;
            mv.form = {};

            AccountService.getProfile().then(
                function (data) {
                    mv.account = data.data;

                    var breadcrumbs = [
                        {href: $state.href('class'), title: 'Trang chủ'},
                        {title: 'Tài khoản'}
                    ];

                    BreadCrumbsService.update(breadcrumbs);
                },
                function (error) {
                    NotificationService.error(error.data.message);
                }
            );

            function openEdit(field) {
                mv.form[field] = true;
            }

            function closeEdit(field) {
                mv.form[field] = false;
            }

            function update(field) {
                var value = mv.account[field];
                var data = {};
                data[field] = value;

                AccountService.updateProfile(data).then(
                    function (data) {
                        NotificationService.success('Cập nhật thành công!');
                        closeEdit(field);
                    },
                    function (error) {
                        NotificationService.error(error.data.message);
                    }
                )
            }
        });

})();