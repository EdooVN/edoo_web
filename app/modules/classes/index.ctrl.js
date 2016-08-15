(function () {
    'use strict';

    angular.module('app.core')
        .controller('ClassIndexController', function ($location, StorageService, ClassService) {
            var token = StorageService.getToken();
            if (!token) {
                $location.path('/');
            }

            this.listClass = [];
            var mv = this;

            ClassService.getClasses().then(function (data) {
                mv.listClass = data.data.classes;
            }, function (error) {
                console.log(error);
            });
        });

})();