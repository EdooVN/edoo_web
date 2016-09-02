(function () {
    'use strict';

    angular.module('app.core')
        .controller('ClassIndexController', function (StorageService, ClassService, PageValues) {
            this.listClass = [];
            var mv = this;

            PageValues.title = 'Tất cả các lớp môn học';

            ClassService.getClasses().then(function (data) {
                mv.listClass = data.data.classes;
            }, function (error) {
                console.log(error);
            });
        });
})();