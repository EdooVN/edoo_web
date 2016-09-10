(function () {
    'use strict';

    angular
        .module('app.config', ['angular-loading-bar', 'angularMoment'])
        .config(configs)
        .run(function (amMoment, $rootScope, $state, PageValues) {
            amMoment.changeLocale('vi', {});

            $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
                PageValues.breadcrumbs = [
                    {href: $state.href('class'), title: 'Trang chủ'}
                ];
            });
        });

    function configs($httpProvider, cfpLoadingBarProvider) {
        $httpProvider.interceptors.push('HTTPInterceptor');
        cfpLoadingBarProvider.includeSpinner = false;
    }
})();