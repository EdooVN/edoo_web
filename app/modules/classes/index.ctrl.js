(function () {
    'use strict';

    angular.module('app.core')
        .controller('ClassIndexController', function ($location, StorageService, ClassService) {
            this.listClass = [];
            var mv = this;

            var classes = StorageService.getClasses() || false;
            if (classes) {
                mv.listClass = classes;
            } else {
                ClassService.getClasses().then(function (data) {
                    var classes = data.data.classes;
                    StorageService.setClasses(classes);
                    mv.listClass = classes;
                }, function (error) {
                    console.log(error);
                });
            }
        });
})();