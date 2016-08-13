(function () {
    'use strict';

    angular.module('app.localStorage', ['LocalStorageModule'])

        .factory('localStorage', function ($cacheFactory) {
            return $cacheFactory('localStorage');
        })

        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('edoo');
        })

        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setDefaultToCookie(true);
        });
})();