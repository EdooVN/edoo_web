(function () {
    'use strict';

    angular.module('app.core')
        .controller('WelcomeController', function ($scope, localStorageService, $location) {
            var token = localStorageService.get('user_token');

            if (token) {
                $location.path('/class');
            }
        });
})();