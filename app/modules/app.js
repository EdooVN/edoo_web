(function () {
    'use strict';

    angular.module('app', ['app.config', 'app.routes', 'app.localStorage', 'app.core', 'app.services']);
})();

(function ($) {
    $(document).ready(function () {
        $(window).on('logout', function () {
            console.log("OK");
        });
    });
})(jQuery);