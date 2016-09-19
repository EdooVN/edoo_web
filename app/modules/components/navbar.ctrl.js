(function () {
    'use strict';

    angular.module('app.core')
        .controller('NavbarController', NavbarController);

    function NavbarController($rootScope, PageValues, ClassService, AuthService, NotificationService) {
        var mv = this;
        mv.data = PageValues;
        mv.classes = [];
        mv.temp = temp;

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
                NotificationService.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại!');
            });
        }

        function temp() {
            NotificationService.information('Chức năng này đang được hoàn thiện');
        }
    }
})();