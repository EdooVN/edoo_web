(function () {
    'use strict';

    angular.module('app.core')
        .controller('ContactController', function ($scope, $state, localStorageService, $location, PageValues) {
            var token = localStorageService.get('user_token');

            PageValues.title = 'Contact Us';

            if (token) {
                //$state.go('class');
            }
        });
})();
