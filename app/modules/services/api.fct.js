(function () {
    'use strict';

    angular.module('app.services')
        .constant('BASE_URL', 'http://api.uetf.me')
        .factory('APIService', APIService);

    function APIService($http, BASE_URL) {
        return {
            makeRequest: makeRequest
        };

        function makeRequest() {

        }
    }
})();