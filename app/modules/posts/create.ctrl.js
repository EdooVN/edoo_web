(function () {
    'use strict';

    angular.module('app.core')

        .controller('CreatePostController', function ($location, $stateParams, StorageService, PostService, ClassService, PageValues, NotificationService) {
            var mv = this;

            mv.data = PageValues;
            mv.class_id = $stateParams.classId;
            mv.user = StorageService.getUserData();

            mv.newPost = {};
            mv.newPost.content = '';
            mv.newPost.class_id = mv.class_id;
            mv.newPost.type = 'question';
            mv.newPost.is_incognito = "0";

            mv.tinymceOptions = {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                entity_encoding: 'raw'
            };

            mv.createPost = createPost;

            function createPost() {
                PostService.createPost(mv.newPost).then(
                    function (data) {
                        var newPost = data.data;
                        var post_id = newPost.id;
                        $location.path('/class/' + mv.class_id + '/post/' + post_id);
                    },
                    function (error) {
                        var data = error.data;
                        var message = data.message;
                        NotificationService.error(message);
                    }
                );
            }
        });
})();
