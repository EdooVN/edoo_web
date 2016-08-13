(function () {
    'use strict';

    angular.module('app.core')
        .controller('LoginController', function ($http, $rootScope, $location, localStorageService, LoginService) {
            var thisCtrl = this;

            this.signIn = function () {
                LoginService.login(this.email, this.password).then(
                    function (data) {
                        $rootScope.$emit('loginSuccess', data.data);
                        $location.path('/class');
                    },
                    function (error) {
                        var message = error.data.message;
                        thisCtrl.errors = [message];
                    }
                );
            };

            var token = localStorageService.get('user_token');

            if (token) {
                return $location.path('/');
            }

            this.errors = [];
            this.email = 'quytm_58@vnu.edu.vn';// To test
            this.password = '123456';
        });
})();