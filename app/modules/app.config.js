(function () {
    'use strict';

    angular
        .module('app.config', ['angular-loading-bar', 'angularMoment'])
        .config(configs)
        .run(function(amMoment) {
            amMoment.changeLocale('vi');
        });

    function configs($httpProvider, cfpLoadingBarProvider) {
        $httpProvider.interceptors.push('HTTPInterceptor');
        cfpLoadingBarProvider.includeSpinner = false;
    }
})();