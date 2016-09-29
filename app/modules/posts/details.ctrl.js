(function (emojione, moment) {
    'use strict';

    angular.module('app.core')

        .controller('PostDetailsController', function ($scope, $location, $rootScope, $interval, $state, StorageService, $stateParams, PostService, PageValues, NotificationService, BreadCrumbsService, FileUpload) {
            var mv = this;
            var user = StorageService.getUserData();

            mv.data = PageValues;

            mv.post = {};
            mv.class_id = $stateParams.classId;
            mv.post_id = $stateParams.postId;
            mv.comment = comment;
            mv.votePost = votePost;
            mv.voteComment = voteComment;
            mv.devoteComment = devoteComment;
            mv.selectFile = selectFile;
            mv.uploadExercise = uploadExercise;
            mv.getListExercise = getListExercise;
            mv.downloadAllExercise = downloadAllExercise;
            mv.remove = remove;
            mv.edit = edit;
            mv.solve = solve;
            mv.byPostAuthor = false;
            mv.disableBtnUpload = false;
            mv.disableUploadExercise = false;
            mv.post.listExercise = [];

            mv.tinymceOptions = {
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                content_css: '//www.tinymce.com/css/codepen.min.css'
            };

            $rootScope.$on('progressEventUpload', function (event, args) {
                $scope.f.progress = Math.min(100, parseInt(100.0 * args.loaded / args.total));
            });

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

                mv.post.content = emojione.toImage(mv.post.content);

                if (mv.post.comments && mv.post.comments.length) {
                    for (var i = 0; i < mv.post.comments.length; i++) {
                        mv.post.comments[i].content = emojione.toImage(mv.post.comments[i].content);
                    }
                }

                var timestamp_end = parseFloat(mv.post.time_end);
                var time_moment = moment(timestamp_end);
                mv.post.time_end_event = time_moment.format('HH:mm DD/MM/YYYY');

                /**
                 * Set time remaining
                 */
                var now = new Date();
                var duration = timestamp_end - now.getTime();
                if (duration > 0) {
                    var delay = 1000;
                    $interval(function () {
                        duration = moment.duration(duration - delay, 'milliseconds');
                        var str = '';
                        if (parseInt(duration.asDays()) > 0) {
                            str += parseInt(duration.asDays()) + ' ngày';
                        }

                        if (parseInt(duration.hours()) > 0) {
                            str += ' ' + parseInt(duration.hours()) + 'h';
                        }
                        if (parseInt(duration.minutes()) > 0) {
                            str += ' ' + parseInt(duration.minutes()) + '\'';
                        }

                        if (parseInt(duration.seconds()) > 0) {
                            str += ' ' + parseInt(duration.seconds()) + 's';
                        }
                        mv.post.time_remaining_event = str;
                    }, delay);
                } else {
                    mv.post.time_remaining_event = 'Đã hết hạn nộp bài';
                    mv.disableUploadExercise = true;
                }

                var breadcrumbs = [
                    {href: $state.href('class'), title: 'Danh sách lớp'},
                    {href: $state.href('posts.list', {classId: post.class.id}), title: post.class.name},
                    {title: post.title}
                ];

                BreadCrumbsService.update(breadcrumbs);
            }, function (error) {
                NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại!');
            });

            function downloadAllExercise() {
                PostService.downloadAllExercise(mv.post.id)
                    .then(
                        function (response) {
                            var url_download = response.data;
                            if (url_download) {
                                window.location = url_download;
                            }
                        },
                        function (error) {
                            NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại!');
                        }
                    )
            }

            function getListExercise() {
                PostService.getListExercise(mv.post.id)
                    .then(
                        function (response) {
                            mv.post.listExercise = response.data.attack_files;
                        },
                        function (error) {
                            NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng tải lại trang.');
                        }
                    );
            }

            function selectFile(file, errFiles) {
                $scope.f = file;
                $scope.errFile = errFiles && errFiles[0];
            }

            function uploadExercise() {
                var file = $scope.f;
                if (file) {
                    mv.disableBtnUpload = true;
                    FileUpload.uploadExercise(mv.post.id, file)
                        .then(
                            function (response) {
                                mv.disableBtnUpload = false;
                                $scope.link_download = response.data.url;
                                mv.post.is_send_file = true;

                                NotificationService.success('Bài tập đã được gửi thành công!');
                            },
                            function (error) {
                                mv.disableBtnUpload = false;
                                if (error.status == 400) {
                                    return NotificationService.error('Dung lượng của file cần nhỏ hơn 20MB. Vui lòng thử lại!');
                                }

                                NotificationService.error(error.data.message);
                            }
                        );
                }
            }

            function comment() {
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
                        for (var i = 0; i < mv.post.comments.length; i++) {
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
                        for (var i = 0; i < mv.post.comments.length; i++) {
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
                        for (var i = 0; i < mv.post.comments.length; i++) {
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
})(emojione, moment);
