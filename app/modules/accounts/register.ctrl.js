(function () {
    'use strict';

    angular.module('app.core')
        .controller('RegisterController', function ($http, $rootScope, $location, $state, localStorageService, PageValues, AccountService, NotificationService) {
            var mv = this;

            PageValues.title = 'Đăng ký';

            let queries = $location.search();

            mv.register = register;

            let user = {};
            user.email = queries.email || '';
            user.avatar = queries.avatar || '';
            user.mssv = '';
            user.password = '';
            user.confirmPassword = '';
            mv.user = user;

            mv.disableSubmit = false;

            function register() {
                if (mv.password !== mv.confirmPassword) {
                    NotificationService.error('Mật khẩu không khớp! Vui lòng thử lại');
                    return;
                }

                mv.disableSubmit = true;

                let data = mv.user;
                delete data.confirmPassword;
                data.mssv = data.mssv + "";

                AccountService.register(data).then(
                    function (response) {
                        $state.go('login');
                        mv.disableSubmit = false;
                        NotificationService.success('Chúc mừng bạn đã đăng ký thành công! Vui lòng đăng nhập để bắt đầu sử dụng :)');
                    },
                    function (error) {
                        mv.disableSubmit = false;
                        mv.password = '';
                        NotificationService.error(error.data.message);
                    }
                );
            }
        });
})();