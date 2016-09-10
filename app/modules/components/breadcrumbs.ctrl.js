(function () {
    'use strict';

    angular.module('app.core')
        .controller('BreadcrumbsController', BreadcrumbsController);

    function BreadcrumbsController(PageValues) {
        var vm = this;

        vm.data = PageValues;
    }
})();