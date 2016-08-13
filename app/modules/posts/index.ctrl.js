(function () {
    'use strict';

    angular.module('app.core')

        .controller('ListPostsController', function ($scope, localStorageService, $location, $routeParams, $http) {
            var thisCtrl = this;

            var token = localStorageService.get('user_token');

            if (!token) {
                $location.path('/');
            }
            const host_API = 'http://api.uetf.me';
            this.listPost = [];
            this.class_id = $routeParams.id;
            $http({
                method: 'GET',
                url: host_API + '/posts/' + this.class_id,
                headers: {'Authorization': token}
            }).then(function (response) {
                var data = response.data;

                if (200 === data.statusCode) {
                    thisCtrl.listPost = data.data.posts;
                }
            }, function (error) {
                console.log(error);
            });
        });
})();
