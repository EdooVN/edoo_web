(function () {
    'use strict';

    angular.module('app.core')
        .controller('ChangePasswordController', function ($state, PageValues, AccountService, NotificationService, StorageService, BreadCrumbsService) {
            var mv = this;

            mv.update = update;
            mv.toggle_display = toggle_display;

            mv.display = {
                old_pass: false,
                new_pass: false,
                confirm_pass: false
            };

            mv.disableSubmit = false;

            var breadcrumbs = [
                {href: $state.href('class'), title: 'Trang chủ'},
                {title: 'Đổi mật khẩu'}
            ];

            BreadCrumbsService.update(breadcrumbs);

            function toggle_display(field) {
                mv.display[field] = !mv.display[field];
            }

            function update() {
                mv.disableSubmit = true;

                var validate = validate_pass();
                if (!validate) {
                    return;
                }

                AccountService.changePassword(mv.old_pass, mv.new_pass, mv.confirm_pass).then(
                    function (data) {
                        mv.disableSubmit = false;

                        if (data.status > 200) {
                            reset_all();
                            return NotificationService.error(data.data.message);
                        }

                        var token = data.data.token;
                        StorageService.setToken(token);

                        reset_all();
                        NotificationService.success('Cập nhật mật khẩu thành công!');
                    },
                    function (error) {
                        mv.disableSubmit = false;
                        NotificationService.error(error.message);
                    }
                )
            }

            function validate_pass() {
                if (mv.new_pass !== mv.confirm_pass) {
                    NotificationService.error('Mật khẩu không khớp! Vui lòng thử lại');
                    reset_all();
                    return false;
                }

                return true;
            }

            function reset_all() {
                mv.old_pass = '';
                mv.new_pass = '';
                mv.confirm_pass = '';
            }
        })
})();