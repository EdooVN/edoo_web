(function (moment) {
    'use strict';

    angular.module('app.core')

        .controller('CreatePostController', function ($scope, $location, $stateParams, StorageService, PostService, ClassService, PageValues, NotificationService) {
            var mv = this;

            PageValues.title = 'Đăng bài mới';
            mv.button = 'Đăng câu hỏi';

            mv.data = PageValues;
            mv.class_id = $stateParams.classId;
            mv.user = StorageService.getUserData();
            mv.isTeacher = (mv.user.capability == 'teacher');
            mv.date_format = 'dd/MM/yyyy HH:mm:ss';

            mv.newPost = {};
            mv.newPost.content = '';
            mv.newPost.class_id = mv.class_id;
            mv.newPost.type = 'question';
            mv.newPost.is_incognito = "0";

            mv.tinymceOptions = {
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                content_css: '//www.tinymce.com/css/codepen.min.css'
            };

            mv.createPost = createPost;
            mv.changePostType = changePostType;

            function changePostType() {
                switch (mv.newPost.type) {
                    case 'note':
                        mv.button = 'Đăng ghi chú';
                        break;

                    case 'poll':
                        mv.button = 'Đăng bài thăm dò ý kiến';
                        break;

                    case 'notification':
                        mv.button = 'Đăng thông báo';
                        break;

                    case 'event':
                        mv.button = 'Đăng thu bài tập';
                        break;

                    default:
                        mv.button = 'Đăng câu hỏi';
                }
            }

            function createPost() {
                if (mv.newPost.type == 'event') {
                    var str = mv.time_end_event;
                    var time = moment(str, mv.date_format);
                    mv.newPost.event_end = time.valueOf() + '';
                }

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
})(moment);
