(function ($) {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('APIService', APIService);

    function APIService($http, $q, BASE_URL) {
        return {
            makeRequest: makeRequest
        };

        function makeRequest(config) {
            var deferred = $q.defer();

            config = config || {};
            config.url = BASE_URL + config.url;

            $(window).trigger('http_start');
            $http(config).then(
                function (response) {
                    $(window).trigger('http_complete');
                    deferred.resolve(response);
                },

                function (error) {
                    $(window).trigger('http_complete');
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }
    }
})(jQuery);