(function () {
    'use strict';

    angular.module('app.core')
        .controller('NavbarController', NavbarController);

    function NavbarController(PageValues, ClassService) {
        var mv = this;
        mv.data = PageValues;
        mv.classes = [];

        ClassService.getClasses().then(function (data) {
            mv.classes = data.data.classes;
        }, function (error) {
            console.log(error);
        });
    }
})();