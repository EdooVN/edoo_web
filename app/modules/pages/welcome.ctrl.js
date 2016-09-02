(function () {
    'use strict';

    angular.module('app.core')
        .controller('WelcomeController', function ($scope, localStorageService, $location, PageValues) {
            var token = localStorageService.get('user_token');

            PageValues.title = 'Chào mừng bạn đến với mạng xã hội Edoo';

            if (token) {
                $location.path('/class');
            }
        });
})();