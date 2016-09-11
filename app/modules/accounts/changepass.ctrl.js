(function () {
    'use strict';

    angular.module('app.core')
        .controller('ChangePasswordController', function ($state, PageValues, AccountService, NotificationService, StorageService) {
            var mv = this;

            mv.update = update;
            mv.toggle_display = toggle_display;

            mv.display = {
                old_pass: false,
                new_pass: false,
                confirm_pass: false
            };

            function toggle_display(field) {
                mv.display[field] = !mv.display[field];
            }

            function update() {
                var validate = validate_pass();
                if (!validate) {
                    return;
                }

                AccountService.changePassword(mv.old_pass, mv.new_pass, mv.confirm_pass).then(
                    function (data) {
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
        });
})();