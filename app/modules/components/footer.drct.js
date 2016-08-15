(function () {
    'use strict';

    angular.module('app.core')
        .directive('edFooter', edFooter);

    function edFooter() {
        return {
            templateUrl: 'templates/components/footer.html',
            restrict: 'A',
            controller: 'FooterController',
            controllerAs: 'footerCtrl'
        };
    }
})();