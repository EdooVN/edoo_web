(function () {
    'use strict';

    angular.module('app.core')
        .controller('NavbarController', NavbarController);

    function NavbarController(PageValues, ClassService, StorageService) {
        var mv = this;
        mv.data = PageValues;
        var classes = StorageService.getClasses();
        if (!classes) {
            ClassService.getClasses().then(
                function (data) {
                    var classes = data.data.classes;
                    StorageService.setClasses(classes);
                    mv.classes = classes;
                },
                function (error) {
                    console.log(error);
                }
            );
        } else {
            mv.classes = classes;
        }
    }
})();