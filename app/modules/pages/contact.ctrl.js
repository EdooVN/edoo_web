(function () {
    'use strict';

    angular.module('app.core')
        .controller('ContactPageController', function ($state, PageValues, AuthService, PageSupportService, NotificationService) {
            PageValues.title = 'Hỗ trợ';
            var mv = this;

            mv.type = '1';

            if (AuthService.isAuthorized()) {
                mv.email = PageValues.user.email;
            }

            mv.submitContactForm = submitContactForm;

            function submitContactForm() {
                var data = {
                    email: mv.email,
                    type: mv.type,
                    content: mv.content
                };

                PageSupportService.submitSupport(data)
                    .then(
                        function (response) {
                            $state.go('welcome');
                            NotificationService.success('Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ giải quyết và phản hồi cho bạn sớm :)');
                        }, function (error) {
                            NotificationService.error(error.data.message);
                        }
                    );

            }
        });
})();
