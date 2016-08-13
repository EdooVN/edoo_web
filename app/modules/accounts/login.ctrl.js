(function () {
    'use strict';

    angular.module('app.core')
        .controller('LoginController', function ($http, $rootScope, $location, localStorageService) {
            this.signIn = function () {
                var data = {
                    email: this.email,
                    password: this.password
                };

                const host_API = 'http://api.uetf.me';

                var api_url = host_API + '/login';

                $http({
                    method: 'POST',
                    url: api_url,
                    data: data
                }).then(function (response) {
                    var data = response.data;

                    if (200 === data.statusCode) {
                        $rootScope.$emit('loginSuccess', data.data);

                        $location.path('/class');
                    }
                }, function (response) {
                    console.log(response);
                });
            };

            var token = localStorageService.get('user_token');

            if (token) {
                return $location.path('/');
            }

            this.email = 'quytm_58@vnu.edu.vn';// To test
            this.password = '123456';
        });
})();