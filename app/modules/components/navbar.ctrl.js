(function () {
    'use strict';

    angular.module('app.core')
        .controller('NavbarController', NavbarController);

    function NavbarController(PageValues, StorageService) {
        var mv = this;
        mv.data = PageValues;
        mv.classes = StorageService.getClasses();
    }
})();