(function () {
    'use strict';

    angular.module('app.core')

        .controller('ClassIndexController', function ($scope, localStorageService, $location, $http) {
            var token = localStorageService.get('user_token');
            if (!token) {
                $location.path('/');
            }

            this.listClass = [];
            var thisCtrl = this;

            const host_API = 'http://api.uetf.me';

            $http({
                method: 'GET',
                url: host_API + '/classes',
                headers: {'Authorization': token},
                cache: true
            }).then(function (response) {
                var data = response.data;

                if (200 === data.statusCode) {
                    thisCtrl.listClass = data.data.classes;
                }
            }, function (error) {
                console.log(error);
            });
        });

})();