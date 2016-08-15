(function () {
    'use strict';

    angular
        .module('app.core')
        .value('PageValues', {
            loading: false,
            isAuthenticated: false,
            user: {},
            token: ''
        });
})();