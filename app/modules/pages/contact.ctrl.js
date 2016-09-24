(function () {
    'use strict';

    angular.module('app.core')
        .controller('ContactPageController', function (PageValues) {
            PageValues.title = 'Liên hệ';

            var mv = this;
            mv.submitContactForm = submitContactForm;

            function submitContactForm() {
                console.log('submit nef! :v');
            }
        });
})();
