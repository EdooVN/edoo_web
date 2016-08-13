(function () {
    'use strict';

    angular.module('app.core')
        .controller('ClassIndexController', function ($location, StorageService, ClassService) {
            var token = StorageService.getToken();
            if (!token) {
                $location.path('/');
            }

            this.listClass = [];
            var thisCtrl = this;

            ClassService.getClasses().then(function (data) {
                thisCtrl.listClass = data.data.classes;
            }, function (error) {
                console.log(error);
            });
        });

})();