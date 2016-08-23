(function () {
    'use strict';

    angular
        .module('app.config', ['angular-loading-bar'])
        .config(configs);

    function configs(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }
})();