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
                var classes = data.data.classes;
                StorageService.setClasses(classes);
                mv.listClass = classes;
            }, function (error) {
                console.log(error);
            });
        });

})();