(function () {
    'use strict';

    angular
        .module('app.config', ['angular-loading-bar'])
        .config(configs);

    function configs($httpProvider, cfpLoadingBarProvider) {
        $httpProvider.interceptors.push('HTTPInterceptor');
        cfpLoadingBarProvider.includeSpinner = false;
    }
})();