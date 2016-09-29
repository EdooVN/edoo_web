(function () {
    'use strict';

    angular.module('app.services')
        .factory('FileUpload', FileUpload);

    function FileUpload($q, APIService) {
        return {
            upload: upload,
            uploadExercise: uploadExercise
        };

        function upload(file) {
            var fd = new FormData();
            fd.append('file', file);
        }


        function uploadExercise(post_id, file) {
            var deferred = $q.defer();

            APIService.upload('/upfileevent/' + post_id, file)
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (error) {
                        deferred.reject(error);
                    }
                );

            return deferred.promise;
        }
    }
})();