(function () {
    'use strict';

    angular.module('app.services')
        .factory('NotificationService', NotificationService);

    function NotificationService() {
        return {
            error: error,
            success: success,
            warning: warning,
            information: information,
            confirm: confirm
        };

        function confirm(content) {
            return _add(content, 'confirm');
        }

        function information(content) {
            return _add(content, 'information');
        }

        function warning(content) {
            return _add(content, 'warning');
        }

        function error(content) {
            return _add(content, 'error');
        }

        function success(content) {
            return _add(content, 'success');
        }

        function _add(content, type) {
            type = type || 'success';

            return noty({
                layout: 'topRight',
                text: content,
                type: type,
                animation: {
                    open: 'animated bounceInRight',
                    close: 'animated bounceOutRight'
                },
                timeout: 3000,
                closeWith: ['click'],
                killer: true,
                theme: 'edoo'
            });
        }
    }
})();