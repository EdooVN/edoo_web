(function () {
    var app = angular.module('edooClass', []);

    app.controller('ClassController', function ($scope, $rootScope, $location) {
        $scope.listClass = 'abc';

        if (!$rootScope.inAuthenticated) {
            $location.path('/login');
        }
    });
})();