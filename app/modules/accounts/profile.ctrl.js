(function () {
    'use strict';

    angular.module('app.core')
        .controller('ProfileController', function (PageValues, AccountService) {
            var mv = this;

            PageValues.title = 'Thông tin tài khoản';

            mv.account = {};

            AccountService.getProfile().then(
                function (response) {
                    mv.account = response.data;
                },
                function (error) {
                    console.log(error);
                }
            );
        });

})();