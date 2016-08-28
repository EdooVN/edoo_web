(function () {
    'use strict';

    angular.module('app.services')
        .factory('NotificationService', NotificationService);

    function NotificationService() {
        return {
            add: add
        };

        function add(content, type) {
            type = type || 'success';

            return noty({
                layout: 'topRight',
                text: content,
                type: type,
                animation: {
                    open: 'animated bounceInRight',
                    close: 'animated bounceOutRight',
                    easing: 'swing',
                    speed: 500
                },
                theme: 'relax'
            });
        }
    }
})();