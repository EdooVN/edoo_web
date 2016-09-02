(function () {
    'use strict';

    angular.module('app.core')
        .controller('HeadController', HeadController);

    function HeadController(PageValues) {
        var vm = this;
        vm.Page = PageValues;
    }
})();