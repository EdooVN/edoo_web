(function () {
    'use strict';

    angular.module('app.core')
        .controller('ClassIndexController', function (StorageService, ClassService) {
            this.listClass = [];
            var mv = this;

            ClassService.getClasses().then(function (data) {
                mv.listClass = data.data.classes;
            }, function (error) {
                console.log(error);
            });
        });
})();