(function () {
    'use strict';

    angular.module('app.services')
        .factory('BreadCrumbsService', BreadCrumbsService);

    function BreadCrumbsService(PageValues) {
        return {
            update: update
        };

        function update(data) {
            PageValues.breadcrumbs = data;
        }
    }
})();