(function () {
    'use strict';

    angular.module('app.core')
        .controller('AboutPageController', function (PageValues) {
            PageValues.title = 'Về chúng tôi';
        });
})();