(function () {
    'use strict';

    angular.module('app.core')
        .controller('BreadcrumbsController', BreadcrumbsController);

    function BreadcrumbsController($rootScope) {
        var vm = this;

        vm.links = [];

        $rootScope.$on('updateBreadcrumbs', function (event, breadcrumbs) {
            vm.links = breadcrumbs;
        });
    }
})();