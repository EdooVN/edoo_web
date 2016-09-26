(function () {
    'use strict';

    angular.module('app.core')
        .controller('ForgetPasswordController', function ($state, PageValues, AccountService, NotificationService) {
            var mv = this;

            PageValues.title = 'Khôi phục mật khẩu';

            mv.submit = submit;

            function submit() {
                AccountService.resetPassword(mv.email, mv.code)
                    .then(
                        function (response) {
                            var data = response.data;

                            if (data.statusCode > 200) {
                                if (data.statusCode == 422) {
                                    NotificationService.error('Email hoặc mã số sinh viên không đúng. Vui lòng thử lại!');
                                    return;
                                }

                                NotificationService.error(data.message);
                                return;
                            }

                            NotificationService.success('Yêu cầu của bạn đã gửi thành công. Vui lòng kiểm tra mail để hoàn tất!');
                            $state.go('welcome');
                        },
                        function (error) {
                            NotificationService.error(error.message);
                        }
                    )
            }
        });
})();