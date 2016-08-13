(function () {
    'use strict';

    angular.module('app.core')

        .controller('PostDetailsController', function ($scope, localStorageService, $location, $routeParams, $http) {
            var thisCtrl = this;

            var token = localStorageService.get('user_token');

            if (!token) {
                $location.path('/');
            }

            const host_API = 'http://api.uetf.me';
            this.post = {};
            this.class_id = $routeParams.class;
            this.post_id = $routeParams.post;
            $http({
                method: 'GET',
                url: host_API + '/post/' + this.post_id,
                headers: {'Authorization': token},
                cache: true
            }).then(function (response) {
                var data = response.data;

                if (200 === data.statusCode) {
                    thisCtrl.post = data.data;
                }
            }, function (error) {
                console.log(error);
            });
        });
})();
