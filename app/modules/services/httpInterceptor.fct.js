(function () {
    'use strict';

    angular.module('app.services')
        .factory('HTTPInterceptor', HTTPInterceptor);

    function HTTPInterceptor($q, $rootScope) {
        return {
            'request': function (config) {
                return config;
            },

            'requestError': function (rejection) {
                $rootScope.$emit('requestError', rejection);

                return $q.reject(rejection);
            },

            'response': function (response) {
                return response;
            },

            'responseError': function (rejection) {
                if (rejection.status == 401) {
                    $rootScope.$emit('unauthorized', rejection);
                }

                return $q.reject(rejection);
            }
        };
    }
})();