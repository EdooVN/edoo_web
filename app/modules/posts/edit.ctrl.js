(function (moment) {
    'use strict';

    angular.module('app.core')

        .controller('EditPostController', function ($state, $stateParams, StorageService, PostService, ClassService, PageValues, NotificationService, BreadCrumbsService) {
            var mv = this;

            PageValues.title = 'Sửa bài';
            mv.button = 'Cập nhật';

            mv.data = PageValues;
            mv.class_id = $stateParams.classId;
            mv.post_id = $stateParams.postId;
            mv.user = StorageService.getUserData();
            mv.isTeacher = (mv.user.capability == 'teacher');
            mv.date_format = 'dd/MM/yyyy HH:mm:ss';

            mv.tinymceOptions = {
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                content_css: '//www.tinymce.com/css/codepen.min.css'
            };

            mv.update = update;

            PostService.getPost(mv.post_id).then(function (data) {
                var post = data.data;

                if (!post.author) {
                    $state.go('class');
                    return;
                }

                if (post.author.id != mv.user.id) {
                    $state.go('class');
                    return;
                }

                var class_id = post.class_id;
                if (class_id !== mv.class_id) {
                    $state.go('posts.list.edit', {postId: mv.post_id, classId: mv.class_id});
                }
                mv.post = post;
                mv.post.is_incognito += '';
                var time_end = parseFloat(mv.post.time_end);
                var time_moment = moment(time_end);
                mv.time_end_event = time_moment.format('DD/MM/YYYY HH:mm:ss');

                PageValues.title = post.title;

                var breadcrumbs = [
                    {href: $state.href('class'), title: 'Danh sách lớp'},
                    {href: $state.href('posts.list', {classId: post.class.id}), title: post.class.name},
                    {title: 'Sửa bài viết'}
                ];

                BreadCrumbsService.update(breadcrumbs);
            }, function (error) {
                NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng tải lại trang.');
            });

            function update() {
                var args = {
                    post_id: mv.post.id,
                    title: mv.post.title,
                    content: mv.post.content,
                    is_incognito: mv.post.is_incognito,
                    type: mv.post.type
                };

                if (mv.post.type == 'event') {
                    var str = mv.time_end_event;
                    var time = moment(str, 'DD/MM/YYYY HH:mm:ss');
                    args.event_end = time.valueOf() + '';
                }

                PostService.updatePost(args).then(
                    function (data) {
                        NotificationService.success('Cập nhật bài viết thành công.');
                        $state.go('posts.list.detail', {postId: mv.post_id, classId: mv.class_id});
                    },
                    function (error) {
                        NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại sau!');
                    }
                );
            }
        });
})(moment);
