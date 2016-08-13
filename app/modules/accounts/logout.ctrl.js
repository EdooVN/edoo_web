(function () {
    'use strict';

    angular.module('app.core')
        .controller('LogoutController', function ($rootScope, $location, AccountService) {
            this.logout = function () {
                AccountService.logout().then(
                    function (data) {
                        $rootScope.$emit('logoutSuccess');
                        $location.path('/');
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            };

            this.logout();
        });
})();