(function () {
    'use strict';

    angular.module('app.core')
        .controller('LoginController', function ($http, $rootScope, $location, localStorageService, AccountService) {
            var mv = this;

            mv.signIn = signIn;
            mv.errors = [];
            mv.email = 'minhnt_58@vnu.edu.vn';// To test
            mv.password = '123456';

            var token = localStorageService.get('user_token');

            if (token) {
                return $location.path('/');
            }

            function signIn() {
                AccountService.login(mv.email, mv.password).then(
                    function (response) {
                        $rootScope.$emit('loginSuccess', response.data);
                        $location.path('/class');
                    },
                    function (error) {
                        var message = error.data.message;
                        mv.errors = [message];
                    }
                );
            }
        });
})();