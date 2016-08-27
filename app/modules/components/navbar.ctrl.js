(function () {
    'use strict';

    angular.module('app.core')
        .controller('NavbarController', NavbarController);

    function NavbarController($rootScope, PageValues, ClassService, AuthService) {
        var mv = this;
        mv.data = PageValues;
        mv.classes = [];

        if (AuthService.isAuthorized()) {
            _fetchClasses();
        }

        $rootScope.$on('loginSuccess', function (event, args) {
            _fetchClasses();
        });

        function _fetchClasses() {
            ClassService.getClasses().then(function (data) {
                mv.classes = data.data.classes;
            }, function (error) {
                console.log(error);
            });
        }
    }
})();