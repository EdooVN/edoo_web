(function () {
    'use strict';

    angular.module('app.core')

        .controller('PostDetailsController', function ($state, StorageService, $stateParams, PostService, PageValues, NotificationService, BreadCrumbsService) {
            var mv = this;
            var user = StorageService.getUserData();

            mv.data = PageValues;

            var quill = new Quill('#answer', {
                theme: 'snow'
            });

            mv.post = {};
            mv.class_id = $stateParams.classId;
            mv.post_id = $stateParams.postId;
            mv.comment = comment;
            mv.votePost = votePost;
            mv.voteComment = voteComment;
            mv.devoteComment = devoteComment;
            mv.remove = remove;
            mv.edit = edit;
            mv.solve = solve;
            mv.byPostAuthor = false;

            PostService.getPost(this.post_id).then(function (data) {
                var post = data.data;
                var class_id = post.class_id;
                if (class_id !== mv.class_id) {
                    $state.go('posts.list.detail', {postId: mv.post_id, classId: mv.class_id});
                }
                mv.post = post;

                if (post.author) {
                    mv.byPostAuthor = (post.author.id == user.id);
                }

                PageValues.title = post.title;

                var breadcrumbs = [
                    {href: $state.href('class'), title: 'Danh sách lớp'},
                    {href: $state.href('posts.list', {classId: post.class.id}), title: post.class.name},
                    {title: post.title}
                ];

                BreadCrumbsService.update(breadcrumbs);
            }, function (error) {
                NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng tải lại trang.');
            });

            function comment() {
                mv.answer = jQuery('#answer .ql-editor').html();

                if (!mv.answer) {
                    return NotificationService.error('Bạn cần phải thêm nội dung vào bình luận :)');
                }

                var data = {
                    post_id: mv.post_id,
                    content: mv.answer,
                    is_incognito: false
                };

                PostService.comment(data).then(
                    function (data) {
                        mv.answer = '';
                        var new_comment = data.data;
                        new_comment.votes = [];
                        mv.post.comments.push(new_comment);
                        quill.deleteText(0, quill.getLength());
                    },
                    function (error) {
                        NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');
                    }
                )
            }

            function votePost(type) {
                PostService.votePost(mv.post_id, type).then(
                    function (data) {
                        mv.post.vote_count = data.data.vote_count;
                        NotificationService.success('Bạn đã vote thành công');
                    },
                    function (error) {
                        NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');
                    }
                )
            }

            function voteComment(comment_id) {
                var data = {
                    comment_id: comment_id
                };

                PostService.voteComment(data).then(
                    function (response) {
                        for (var i=0; i<mv.post.comments.length; i++) {
                            var comment = mv.post.comments[i];

                            if (comment.id == comment_id) {
                                mv.post.comments[i].vote_count = response.data.vote_count;
                                break;
                            }
                        }
                        NotificationService.success('Bạn đã vote cho bình luận thành công');
                    },
                    function (error) {
                        NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');
                    }
                )
            }

            function devoteComment(comment_id) {
                var data = {
                    comment_id: comment_id
                };

                PostService.devoteComment(data).then(
                    function (response) {
                        for (var i=0; i<mv.post.comments.length; i++) {
                            var comment = mv.post.comments[i];

                            if (comment.id == comment_id) {
                                mv.post.comments[i].vote_count = response.data.vote_count;
                                break;
                            }
                        }
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
                        for (var i=0; i<mv.post.comments.length; i++) {
                            var comment = mv.post.comments[i];

                            if (comment.id == comment_id) {
                                mv.post.comments[i].is_solve = 1;
                            } else {
                                mv.post.comments[i].is_solve = 0;
                            }
                        }

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

                PostService.deletePost(mv.post_id).then(
                    function (data) {
                        NotificationService.success('Bài viết đã được xoá!');
                        $state.go('posts.list', {classId: mv.class_id});
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
