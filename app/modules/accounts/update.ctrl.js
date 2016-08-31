(function () {
    'use strict';

    angular.module('app.core')
        .controller('UpdateProfileController', function ($location, NotificationService) {
            var mv = this;

            NotificationService.information('Chức năng này đang được hoàn thiện');
            $location.path('/');
        });
})();