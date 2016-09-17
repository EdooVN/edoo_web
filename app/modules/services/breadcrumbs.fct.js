(function () {
    'use strict';

    angular.module('app.services')
        .factory('BreadCrumbsService', BreadCrumbsService);

    function BreadCrumbsService($rootScope) {
        return {
            update: update
        };

        function update(data) {
            $rootScope.$emit('updateBreadcrumbs', data);
        }
    }
})();