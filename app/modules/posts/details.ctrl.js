(function () {
    'use strict';

    angular.module('app.core')

        .controller('PostDetailsController', function ($state, StorageService, $stateParams, PostService, PageValues, NotificationService) {
            var vm = this;
            var user = StorageService.getUserData();

            vm.data = PageValues;

            vm.tinymceOptions = {
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                entity_encoding: 'raw'
            };

            vm.post = {};
            vm.class_id = $stateParams.classId;
            vm.post_id = $stateParams.postId;
            vm.comment = comment;
            vm.votePost = votePost;
            vm.voteComment = voteComment;
            vm.devoteComment = devoteComment;
            vm.remove = remove;
            vm.edit = edit;
            vm.solve = solve;
            vm.byPostAuthor = false;

            PostService.getPost(this.post_id).then(function (data) {
                var post = data.data;
                var class_id = post.class_id;
                if (class_id !== vm.class_id) {
                    $state.go('posts.list.detail', {postId: vm.post_id, classId: vm.class_id});
                }
                vm.post = post;
                vm.post.vote_count = post.votes.length;

                if (post.author) {
                    vm.byPostAuthor = (post.author.id == user.id);
                }

                PageValues.title = post.title;
            }, function (error) {
                NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng tải lại trang.');
            });

            function comment() {
                var data = {
                    post_id: vm.post_id,
                    content: vm.answer,
                    is_incognito: false
                };

                PostService.comment(data).then(
                    function (data) {
                        vm.answer = '';
                        var new_comment = data.data;
                        new_comment.votes = [];
                        vm.post.comments.push(new_comment);
                    },
                    function (error) {
                        NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');
                    }
                )
            }

            function votePost(type) {
                var data = {
                    post_id: vm.post_id,
                    content: type
                };

                PostService.votePost(data).then(
                    function (data) {
                        vm.post.vote_count = data.data.vote_count;
                        NotificationService.success('Bạn đã vote thành công');
                    },
                    function (error) {
                        NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');
                    }
                )
            }

            function voteComment(comment_id) {
                var data = {
                    comment_id: '' + comment_id
                };

                PostService.voteComment(data).then(
                    function (response) {
                        var comment_id = response.data.id;
                        // @todo need update
                        NotificationService.success('Bạn đã vote cho bình luận thành công');
                    },
                    function (error) {
                        NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');
                    }
                )
            }

            function devoteComment(comment_id) {
                var data = {
                    comment_id: '' + comment_id
                };

                PostService.devoteComment(data).then(
                    function (response) {
                        // @todo need update
                        NotificationService.success('Bạn đã devote cho bình luận thành công');
                    },
                    function (error) {
                        NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');
                    }
                )
            }

            function solve(comment_id) {
                PostService.solve(comment_id).then(
                    function (data) {
                        // @todo need update
                        NotificationService.success('Bạn đã solve cho bình luận thành công');
                    },
                    function (error) {
                        NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');
                    }
                )
            }

            function remove() {
                var r = window.confirm('Bạn có chắc chắn xoá bài viết này?\nChọn Ok để xoá hoặc Cancel để huỷ bỏ');

                if (!r) {
                    return;
                }

                PostService.deletePost(vm.post_id).then(
                    function (data) {
                        NotificationService.success('Bài viết đã được xoá!');
                        $state.go('posts.list', {classId: vm.class_id});
                    },
                    function (error) {
                        NotificationService.error(error.data.message);
                    }
                );
            }

            function edit() {
                NotificationService.information('Chức năng này đang được hoàn thiện ;)');
            }
        });
})();
