(function () {
    'use strict';

    angular.module('app.core')
        .controller('ProfileController', function ($location, NotificationService) {
            var mv = this;

            NotificationService.information('Chức năng này đang được hoàn thiện');
            $location.path('/');
        });
})();