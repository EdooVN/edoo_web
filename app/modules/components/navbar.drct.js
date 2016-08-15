(function () {
    'use strict';

    angular.module('app.core')
        .directive('edNavbar', edNavbar);

    function edNavbar() {
        return {
            templateUrl: 'templates/components/navbar.html',
            restrict: 'A',
            controller: 'NavbarController',
            controllerAs: 'navbarCtrl'
        };
    }
})();