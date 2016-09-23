(function () {
    'use strict';

    angular.module('app.core')
        .controller('ContactPageController', function (PageValues) {
            PageValues.title = 'Liên hệ';


        });

    /*angular.module('ContactForm').controller('ContactCtrl', function ($scope) {
        $scope.submitContactForm = function () {
            console.log('submit nef! :v');
        }
    });*/

})();
