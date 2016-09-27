(function () {
    'use strict';

    angular.module('app.core')
        .controller('NewPasswordController', function ($state, $stateParams, PageValues, AccountService, NotificationService) {
            var mv = this;

            PageValues.title = 'Tạo mật khẩu mới';

            mv.submit = submit;
            mv.disableSubmit = false;

            mv.token = $stateParams.token;

            function submit() {
                if (!_validate_pass()) {
                    NotificationService.error('Nhập lại mật khẩu không khớp. Vui lòng thử lại!');
                    mv.confirm_pass = '';
                    return;
                }

                mv.disableSubmit = true;
                AccountService.newPassword(mv.token, mv.new_pass)
                    .then(
                        function (response) {
                            mv.disableSubmit = false;
                            var data = response.data;

                            if (data.statusCode > 200) {
                                NotificationService.error('Link này đã hết bị hết hạn. Vui lòng gửi lại yêu cầu mới!');
                                $state.go('forgetPass');
                                return;
                            }

                            NotificationService.success('Mật khẩu mới đã được tạo, vui lòng đăng nhập để sử dụng!');
                            $state.go('login');
                        },
                        function (error) {
                            mv.disableSubmit = false;
                            NotificationService.error(error.message);
                        }
                    )
            }

            function _validate_pass() {
                return (mv.new_pass === mv.confirm_pass);
            }
        });
})();