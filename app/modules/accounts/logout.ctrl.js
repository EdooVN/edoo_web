(function () {
    'use strict';

    angular.module('app.core')
        .controller('LogoutController', LogoutController);

    function LogoutController($rootScope, $location, AccountService) {
        logout();

        function logout() {
            AccountService.logout().then(
                function (response) {
                    $rootScope.$emit('logoutSuccess');
                    $location.path('/');
                },
                function (error) {
                    console.log(error);
                }
            );
        }
    }
})();