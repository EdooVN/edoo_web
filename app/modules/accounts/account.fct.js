(function () {
    'use strict';

    angular.module('app.services')
        .factory('AccountService', accountService);

    function accountService($q, StorageService, APIService) {
        return {
            login: login,
            logout: logout,
            getProfile: getProfile,
            updateProfile: updateProfile,
            changePassword: changePassword,
            resetPassword: resetPassword,
            newPassword: newPassword
        };

        function login(email, password) {
            var deferred = $q.defer();

            var dataPOST = {
                email: email,
                password: password
            };

            APIService.makeRequest({
                url: '/login',
                method: 'POST',
                data: dataPOST
            }).then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            APIService.makeRequestAuth({
                url: '/logout',
                method: 'GET'
            }).then(
                function (data) {
                    deferred.resolve(data);
                },
                function (error) {
                    deferred.resolve(error);
                }
            );

            return deferred.promise;
        }

        function getProfile() {
            var deferred = $q.defer();
            var token = StorageService.getToken();

            APIService.makeRequest({
                url: '/profile',
                method: 'GET',
                headers: {'Authorization': token}
            }).then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (error) {
                    deferred.resolve(error);
                }
            );

            return deferred.promise;
        }

        function updateProfile(data) {
            var deferred = $q.defer();

            APIService.makeRequestAuth({
                url: '/profile',
                method: 'POST',
                data: data
            }).then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (error) {
                    deferred.resolve(error);
                }
            );

            return deferred.promise;
        }

        function changePassword(old_pass, new_pass, confirm_pass) {
            var data = {
                old_password: old_pass,
                new_password: new_pass
            };
            var deferred = $q.defer();

            APIService.makeRequestAuth({
                url: '/changepass',
                method: 'POST',
                data: data
            }).then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (error) {
                    deferred.resolve(error);
                }
            );

            return deferred.promise;
        }

        function resetPassword(email, code) {
            var data = {
                email: email,
                code: code
            };
            var deferred = $q.defer();

            APIService.makeRequestAuth({
                url: '/sendresetpass',
                method: 'POST',
                data: data
            }).then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (error) {
                    deferred.resolve(error);
                }
            );

            return deferred.promise;
        }

        function newPassword(token, password) {
            var data = {
                new_password: password
            };
            var deferred = $q.defer();

            APIService.makeRequest({
                url: '/resetpass',
                method: 'POST',
                data: data,
                headers: {'Authorization': token}
            }).then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function (error) {
                    deferred.resolve(error);
                }
            );

            return deferred.promise;
        }
    }

})();