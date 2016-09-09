(function () {
    'use strict';

    angular.module('app.core')
        .controller('BreadcrumbsController', BreadcrumbsController);

    function BreadcrumbsController() {
        var vm = this;


        vm.links = [
            {link: '#', title: 'Trang chủ'},
            {link: '#', title: 'Lớp ABC'},
            {link: '#', title: 'Bài viết xyz'}
        ];
    }
})();