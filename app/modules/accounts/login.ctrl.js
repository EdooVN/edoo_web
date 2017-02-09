(function () {
    'use strict';

    angular.module('app.core')
        .controller('LoginController', function ($http, $rootScope, $location, $state, localStorageService, PageValues, AccountService, NotificationService) {
            var mv = this;

            var queries = $location.search();

            PageValues.title = 'Đăng nhập';

            mv.signIn = signIn;
            mv.email = queries.email || '';
            mv.password = '';

            mv.disableSubmit = false;

            var token = localStorageService.get('user_token');

            if (token) {
                return $state.go('welcome');
            }

            function signIn() {
                mv.disableSubmit = true;

                AccountService.login(mv.email, mv.password).then(
                    function (response) {
                        mv.disableSubmit = false;
                        $rootScope.$emit('loginSuccess', response);
                        $state.go('class');
                        NotificationService.success('Xin chào ' + response.data.user.name + '!');
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