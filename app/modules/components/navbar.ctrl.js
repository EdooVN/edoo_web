(function () {
    'use strict';

    angular.module('app.core')
        .controller('NavbarController', NavbarController);

    function NavbarController(PageValues) {
        var mv = this;
        mv.data = PageValues;
    }
})();