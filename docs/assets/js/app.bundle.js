
(function($,emojione){$(document).ready(function(){emojione.ascii=true;});})(jQuery,emojione);(function($){$.noty.themes.edoo={name:'edoo',helpers:{},modal:{css:{position:'fixed',width:'100%',height:'100%',backgroundColor:'#000',zIndex:10000,opacity:0.6,display:'none',left:0,top:0}},style:function(){this.$bar.css({overflow:'hidden',margin:'4px 0',borderRadius:'6px'});this.$message.css({fontSize:'14px',lineHeight:'16px',textAlign:'center',padding:'10px',width:'auto',position:'relative'});this.$closeButton.css({position:'absolute',top:4,right:4,width:10,height:10,background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",display:'none',cursor:'pointer'});this.$buttons.css({padding:5,textAlign:'right',borderTop:'1px solid #ccc',backgroundColor:'#fff'});this.$buttons.find('button').css({marginLeft:5});this.$buttons.find('button:first').css({marginLeft:0});this.$bar.on({mouseenter:function(){$(this).find('.noty_close').stop().fadeTo('normal',1);},mouseleave:function(){$(this).find('.noty_close').stop().fadeTo('normal',0);}});switch(this.options.layout.name){case'top':this.$bar.css({borderBottom:'2px solid #eee',borderLeft:'2px solid #eee',borderRight:'2px solid #eee',borderTop:'2px solid #eee',boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});break;case'topCenter':case'center':case'bottomCenter':case'inline':this.$bar.css({border:'1px solid #eee',boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});this.$message.css({fontSize:'13px',textAlign:'center'});break;case'topLeft':case'topRight':case'bottomLeft':case'bottomRight':case'centerLeft':case'centerRight':this.$bar.css({border:'1px solid #eee',boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});this.$message.css({fontSize:'13px',textAlign:'left'});break;case'bottom':this.$bar.css({borderTop:'2px solid #eee',borderLeft:'2px solid #eee',borderRight:'2px solid #eee',borderBottom:'2px solid #eee',boxShadow:"0 -2px 4px rgba(0, 0, 0, 0.1)"});break;default:this.$bar.css({border:'2px solid #eee',boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});break;}
switch(this.options.type){case'alert':case'notification':this.$bar.css({backgroundColor:'#FFF',borderColor:'#dedede',color:'#444'});break;case'warning':this.$bar.css({backgroundColor:'#FFEAA8',borderColor:'#FFC237',color:'#826200'});this.$buttons.css({borderTop:'1px solid #FFC237'});break;case'error':this.$bar.css({backgroundColor:'#FF8181',borderColor:'#e25353',color:'#FFF'});this.$message.css({fontWeight:'bold'});this.$buttons.css({borderTop:'1px solid darkred'});break;case'information':this.$bar.css({backgroundColor:'#78C5E7',borderColor:'#3badd6',color:'#FFF'});this.$buttons.css({borderTop:'1px solid #0B90C4'});break;case'success':this.$bar.css({backgroundColor:'#BCF5BC',borderColor:'#7cdd77',color:'darkgreen'});this.$buttons.css({borderTop:'1px solid #50C24E'});break;default:this.$bar.css({backgroundColor:'#FFF',borderColor:'#CCC',color:'#444'});break;}},callback:{onShow:function(){},onClose:function(){}}};})(jQuery);(function(){'use strict';angular.module('app.config',['angular-loading-bar','angularMoment']).config(configs).run(function(amMoment,$rootScope,$state,PageValues){amMoment.changeLocale('vi',{});$rootScope.$on('$locationChangeStart',function(event,newUrl,oldUrl){PageValues.breadcrumbs=[{href:$state.href('class'),title:'Trang chủ'}];});});function configs($httpProvider,cfpLoadingBarProvider){$httpProvider.interceptors.push('HTTPInterceptor');cfpLoadingBarProvider.includeSpinner=false;}})();(function(){'use strict';angular.module('app.routes',['ui.router']).config(config);function config($stateProvider,$urlRouterProvider){$urlRouterProvider.when('/','/welcome').otherwise('/');$stateProvider.state('welcome',{url:'/welcome',templateUrl:'templates/pages/welcome.html',controller:'WelcomeController'}).state('about',{url:'/about',templateUrl:'templates/pages/about.html',controller:'AboutPageController'}).state('support',{url:'/support',templateUrl:'templates/pages/contact.html',controller:'ContactPageController',controllerAs:'ContactPageCtrl'}).state('login',{url:'/login',templateUrl:'templates/accounts/login.html',controller:'LoginController',controllerAs:'loginCtrl'}).state('forgetPass',{url:'/forget-password',templateUrl:'templates/accounts/forget-password.html',controller:'ForgetPasswordController',controllerAs:'forgetPassCtrl'}).state('newPass',{url:'/reset-pass/{token}',templateUrl:'templates/accounts/new-password.html',controller:'NewPasswordController',controllerAs:'newPassCtrl'}).state('logout',{url:'/logout',templateUrl:'templates/accounts/logout.html',controller:'LogoutController',controllerAs:'logoutCtrl'}).state('class',{url:'/class',templateUrl:'templates/classes/list-class.html',controller:'ClassIndexController',controllerAs:'classCtrl'}).state('posts',{url:'/class',views:{'':{templateUrl:'templates/layouts/master.html'},'sidebar@posts':{templateUrl:'templates/posts/sidebar.html',controller:'SidebarController',controllerAs:'sidebarCtrl'}}}).state('posts.list',{url:'/{classId}?page',views:{'content@posts':{templateUrl:'templates/posts/list-post.html',controller:'ListPostsController',controllerAs:'postsCtrl'}}}).state('posts.list.detail',{url:'/post/{postId}',views:{'content@posts':{templateUrl:'templates/posts/details.html',controller:'PostDetailsController',controllerAs:'postCtrl'}}}).state('posts.list.create',{url:'/create',views:{'content@posts':{templateUrl:'templates/posts/create.html',controller:'CreatePostController',controllerAs:'createPostCtrl'}}}).state('posts.list.edit',{url:'/edit/{postId}',views:{'content@posts':{templateUrl:'templates/posts/edit.html',controller:'EditPostController',controllerAs:'editPostCtrl'}}}).state('accounts',{views:{'':{templateUrl:'templates/layouts/master.html'},'sidebar@accounts':{templateUrl:'templates/accounts/sidebar.html',controller:'SidebarAccountController',controllerAs:'sidebarAccountCtrl'}}}).state('accounts.profile',{url:'/profile',views:{'content@accounts':{templateUrl:'templates/accounts/profile.html',controller:'ProfileController',controllerAs:'profileCtrl'}}}).state('accounts.changePassword',{url:'/change-password',views:{'content@accounts':{templateUrl:'templates/accounts/change-password.html',controller:'ChangePasswordController',controllerAs:'changePassCtrl'}}})}})();(function(){'use strict';angular.module('app.localStorage',['LocalStorageModule']).factory('localStorage',function($cacheFactory){return $cacheFactory('localStorage');}).config(function(localStorageServiceProvider){localStorageServiceProvider.setPrefix('edoo');}).config(function(localStorageServiceProvider){localStorageServiceProvider.setDefaultToCookie(true);});})();(function(){'use strict';angular.module('app.core',['ui.tinymce','ngSanitize','angularMoment','ngAnimate','angularjs-datetime-picker']);})();(function(){angular.module('app.services',[]);})();(function(){'use strict';angular.module('app.filters',[]).filter('range',function(){return function(input,min,max){min=parseInt(min);max=parseInt(max);for(var i=min;i<=max;i++)
input.push(i);return input;};});})();(function(){'use strict';angular.module('app',['app.config','app.routes','app.localStorage','app.core','app.services','app.filters']);})();(function(){'use strict';angular.module('app.core').controller('HeadController',HeadController);function HeadController(PageValues){var vm=this;vm.Page=PageValues;}})();(function(){'use strict';angular.module('app.core').controller('BreadcrumbsController',BreadcrumbsController);function BreadcrumbsController($rootScope){var vm=this;vm.links=[];$rootScope.$on('updateBreadcrumbs',function(event,breadcrumbs){vm.links=breadcrumbs;});}})();(function(){'use strict';angular.module('app.core').controller('NavbarController',NavbarController);function NavbarController($rootScope,PageValues,ClassService,AuthService,NotificationService){var mv=this;mv.data=PageValues;mv.classes=[];mv.temp=temp;if(AuthService.isAuthorized()){_fetchClasses();}
$rootScope.$on('loginSuccess',function(event,args){_fetchClasses();});function _fetchClasses(){ClassService.getClasses().then(function(data){mv.classes=data.data.classes;},function(error){NotificationService.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại!');});}
function temp(){NotificationService.information('Chức năng này đang được hoàn thiện');}}})();(function(){'use strict';angular.module('app.core').controller('FooterController',FooterController);function FooterController(){}})();(function(){'use strict';angular.module('app.core').controller('WelcomeController',function($scope,$state,localStorageService,$location,PageValues){var token=localStorageService.get('user_token');PageValues.title='Chào mừng bạn đến với mạng xã hội Edoo';if(token){$state.go('class');}});})();(function(){'use strict';angular.module('app.core').controller('ContactPageController',function($state,PageValues,AuthService,PageSupportService,NotificationService){PageValues.title='Hỗ trợ';var mv=this;mv.type='1';if(AuthService.isAuthorized()){mv.email=PageValues.user.email;}
mv.submitContactForm=submitContactForm;function submitContactForm(){var data={email:mv.email,type:mv.type,content:mv.content};PageSupportService.submitSupport(data).then(function(response){$state.go('welcome');NotificationService.success('Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ giải quyết và phản hồi cho bạn sớm :)');},function(error){NotificationService.error(error.data.message);});}});})();(function(){'use strict';angular.module('app.core').controller('AboutPageController',function(PageValues){PageValues.title='Về chúng tôi';});})();(function(){'use strict';angular.module('app.core').controller('LoginController',function($http,$rootScope,$location,$state,localStorageService,PageValues,AccountService,NotificationService){var mv=this;PageValues.title='Đăng nhập';mv.signIn=signIn;mv.email='';mv.password='';mv.disableSubmit=false;var token=localStorageService.get('user_token');if(token){return $state.go('welcome');}
function signIn(){mv.disableSubmit=true;AccountService.login(mv.email,mv.password).then(function(response){mv.disableSubmit=false;$rootScope.$emit('loginSuccess',response);$state.go('class');NotificationService.success('Xin chào '+response.data.user.name+'!');},function(error){mv.disableSubmit=false;mv.password='';NotificationService.error(error.data.message);});}});})();(function(){'use strict';angular.module('app.core').controller('ProfileController',function($state,PageValues,AccountService,NotificationService,BreadCrumbsService){var mv=this;PageValues.title='Thông tin tài khoản';mv.account=false;mv.update=update;mv.openEdit=openEdit;mv.closeEdit=closeEdit;mv.form={};AccountService.getProfile().then(function(data){mv.account=data.data;var breadcrumbs=[{href:$state.href('class'),title:'Trang chủ'},{title:'Tài khoản'}];BreadCrumbsService.update(breadcrumbs);},function(error){NotificationService.error(error.data.message);});function openEdit(field){mv.form[field]=true;}
function closeEdit(field){mv.form[field]=false;}
function update(field){var value=mv.account[field];var data={};data[field]=value;AccountService.updateProfile(data).then(function(data){NotificationService.success('Cập nhật thành công!');closeEdit(field);},function(error){NotificationService.error(error.data.message);})}});})();(function(){'use strict';angular.module('app.core').controller('ChangePasswordController',function($state,PageValues,AccountService,NotificationService,StorageService,BreadCrumbsService){var mv=this;mv.update=update;mv.toggle_display=toggle_display;mv.display={old_pass:false,new_pass:false,confirm_pass:false};mv.disableSubmit=false;var breadcrumbs=[{href:$state.href('class'),title:'Trang chủ'},{title:'Đổi mật khẩu'}];BreadCrumbsService.update(breadcrumbs);function toggle_display(field){mv.display[field]=!mv.display[field];}
function update(){mv.disableSubmit=true;var validate=validate_pass();if(!validate){return;}
AccountService.changePassword(mv.old_pass,mv.new_pass,mv.confirm_pass).then(function(data){mv.disableSubmit=false;if(data.status>200){reset_all();return NotificationService.error(data.data.message);}
var token=data.data.token;StorageService.setToken(token);reset_all();NotificationService.success('Cập nhật mật khẩu thành công!');},function(error){mv.disableSubmit=false;NotificationService.error(error.message);})}
function validate_pass(){if(mv.new_pass!==mv.confirm_pass){NotificationService.error('Mật khẩu không khớp! Vui lòng thử lại');reset_all();return false;}
return true;}
function reset_all(){mv.old_pass='';mv.new_pass='';mv.confirm_pass='';}})})();(function(){'use strict';angular.module('app.core').controller('ForgetPasswordController',function($state,PageValues,AccountService,NotificationService){var mv=this;PageValues.title='Khôi phục mật khẩu';mv.submit=submit;mv.disableSubmit=false;function submit(){mv.disableSubmit=true;AccountService.resetPassword(mv.email,mv.code).then(function(response){mv.disableSubmit=false;var data=response.data;if(data.statusCode>200){if(data.statusCode==422){NotificationService.error('Email hoặc mã số sinh viên không đúng. Vui lòng thử lại!');return;}
NotificationService.error(data.message);return;}
NotificationService.success('Yêu cầu của bạn đã gửi thành công. Vui lòng kiểm tra mail để hoàn tất!');$state.go('welcome');},function(error){mv.disableSubmit=false;NotificationService.error(error.message);})}});})();(function(){'use strict';angular.module('app.core').controller('NewPasswordController',function($state,$stateParams,PageValues,AccountService,NotificationService){var mv=this;PageValues.title='Tạo mật khẩu mới';mv.submit=submit;mv.disableSubmit=false;mv.token=$stateParams.token;function submit(){if(!_validate_pass()){NotificationService.error('Nhập lại mật khẩu không khớp. Vui lòng thử lại!');mv.confirm_pass='';return;}
mv.disableSubmit=true;AccountService.newPassword(mv.token,mv.new_pass).then(function(response){mv.disableSubmit=false;var data=response.data;if(data.statusCode>200){NotificationService.error('Link này đã hết bị hết hạn. Vui lòng gửi lại yêu cầu mới!');$state.go('forgetPass');return;}
NotificationService.success('Mật khẩu mới đã được tạo, vui lòng đăng nhập để sử dụng!');$state.go('login');},function(error){mv.disableSubmit=false;NotificationService.error(error.message);})}
function _validate_pass(){return(mv.new_pass===mv.confirm_pass);}});})();(function(){'use strict';angular.module('app.core').controller('SidebarAccountController',function($location,NotificationService){var mv=this;});})();(function(){'use strict';angular.module('app.core').controller('LogoutController',LogoutController);function LogoutController($rootScope,$location,AccountService){logout();function logout(){AccountService.logout().then(function(response){$rootScope.$emit('logoutSuccess');$location.path('/');},function(error){console.log(error);});}}})();(function(){'use strict';angular.module('app.core').controller('ClassIndexController',function(StorageService,ClassService,PageValues,NotificationService){this.listClass=[];var mv=this;PageValues.title='Tất cả các lớp môn học';PageValues.breadcrumbs=[];ClassService.getClasses().then(function(data){mv.listClass=data.data.classes;},function(error){NotificationService.error(error.data.message);});});})();(function(){'use strict';angular.module('app.core').controller('SidebarController',function(ClassService){this.listClass=[];var mv=this;ClassService.getClasses().then(function(data){mv.listClass=data.data.classes;},function(error){console.log(error);});});})();(function(){'use strict';angular.module('app.core').controller('ListPostsController',function($state,$stateParams,StorageService,PostService,ClassService,PageValues,BreadCrumbsService,NotificationService){var mv=this;PageValues.title='Lớp ...';mv.data=PageValues;mv.listPost=[];mv.class_id=$stateParams.classId;mv.class={};mv.pagination={pageCount:0};mv.page_number=$stateParams.page||1;if(!mv.class_id){$state.go('class');}
PostService.getListPost(this.class_id,mv.page_number).then(function(data){mv.listPost=data.data.posts;mv.class=data.data;mv.pagination=data.data.pagination;PageValues.title='Lớp '+mv.class.name;var breadcrumbs=[{href:$state.href('class'),title:'Danh sách lớp'},{title:mv.class.name}];BreadCrumbsService.update(breadcrumbs);},function(error){NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng tải lại trang.');});});})();(function(){'use strict';angular.module('app.core').controller('PostDetailsController',function($state,StorageService,$stateParams,PostService,PageValues,NotificationService,BreadCrumbsService){var mv=this;var user=StorageService.getUserData();mv.data=PageValues;mv.post={};mv.class_id=$stateParams.classId;mv.post_id=$stateParams.postId;mv.comment=comment;mv.votePost=votePost;mv.voteComment=voteComment;mv.devoteComment=devoteComment;mv.remove=remove;mv.edit=edit;mv.solve=solve;mv.byPostAuthor=false;mv.tinymceOptions={plugins:['advlist autolink lists link image charmap print preview anchor','searchreplace visualblocks code fullscreen','insertdatetime media table contextmenu paste code'],toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',content_css:'//www.tinymce.com/css/codepen.min.css'};PostService.getPost(this.post_id).then(function(data){var post=data.data;var class_id=post.class_id;if(class_id!==mv.class_id){$state.go('posts.list.detail',{postId:mv.post_id,classId:mv.class_id});}
mv.post=post;if(post.author){mv.byPostAuthor=(post.author.id==user.id);}
PageValues.title=post.title;mv.post.content=emojione.toImage(mv.post.content);if(mv.post.comments&&mv.post.comments.length){for(var i=0;i<mv.post.comments.length;i++){mv.post.comments[i].content=emojione.toImage(mv.post.comments[i].content);}}
var breadcrumbs=[{href:$state.href('class'),title:'Danh sách lớp'},{href:$state.href('posts.list',{classId:post.class.id}),title:post.class.name},{title:post.title}];BreadCrumbsService.update(breadcrumbs);},function(error){NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng tải lại trang.');});function comment(){if(!mv.answer){return NotificationService.error('Bạn cần phải thêm nội dung vào bình luận :)');}
var data={post_id:mv.post_id,content:mv.answer,is_incognito:false};PostService.comment(data).then(function(data){mv.answer='';var new_comment=data.data;new_comment.votes=[];mv.post.comments.push(new_comment);},function(error){NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');})}
function votePost(type){PostService.votePost(mv.post_id,type).then(function(data){mv.post.vote_count=data.data.vote_count;NotificationService.success('Bạn đã vote thành công');},function(error){NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');})}
function voteComment(comment_id){var data={comment_id:comment_id};PostService.voteComment(data).then(function(response){for(var i=0;i<mv.post.comments.length;i++){var comment=mv.post.comments[i];if(comment.id==comment_id){mv.post.comments[i].vote_count=response.data.vote_count;break;}}
NotificationService.success('Bạn đã vote cho bình luận thành công');},function(error){NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');})}
function devoteComment(comment_id){var data={comment_id:comment_id};PostService.devoteComment(data).then(function(response){for(var i=0;i<mv.post.comments.length;i++){var comment=mv.post.comments[i];if(comment.id==comment_id){mv.post.comments[i].vote_count=response.data.vote_count;break;}}
NotificationService.success('Bạn đã devote cho bình luận thành công');},function(error){NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');})}
function solve(comment_id){PostService.solve(comment_id).then(function(data){for(var i=0;i<mv.post.comments.length;i++){var comment=mv.post.comments[i];if(comment.id==comment_id){mv.post.comments[i].is_solve=1;}else{mv.post.comments[i].is_solve=0;}}
NotificationService.success('Bạn đã solve cho bình luận thành công');},function(error){NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại.');})}
function remove(){var r=window.confirm('Bạn có chắc chắn xoá bài viết này?\nChọn Ok để xoá hoặc Cancel để huỷ bỏ');if(!r){return;}
PostService.deletePost(mv.post_id).then(function(data){NotificationService.success('Bài viết đã được xoá!');$state.go('posts.list',{classId:mv.class_id});},function(error){NotificationService.error(error.data.message);});}
function edit(){NotificationService.information('Chức năng này đang được hoàn thiện ;)');}});})();(function(moment){'use strict';angular.module('app.core').controller('CreatePostController',function($scope,$location,$stateParams,StorageService,PostService,ClassService,PageValues,NotificationService){var mv=this;PageValues.title='Đăng bài mới';mv.button='Đăng câu hỏi';mv.data=PageValues;mv.class_id=$stateParams.classId;mv.user=StorageService.getUserData();mv.isTeacher=(mv.user.capability=='teacher');mv.date_format='dd/MM/yyyy HH:mm:ss';mv.newPost={};mv.newPost.content='';mv.newPost.class_id=mv.class_id;mv.newPost.type='question';mv.newPost.is_incognito="0";mv.tinymceOptions={plugins:['advlist autolink lists link image charmap print preview anchor','searchreplace visualblocks code fullscreen','insertdatetime media table contextmenu paste code'],toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',content_css:'//www.tinymce.com/css/codepen.min.css'};mv.createPost=createPost;mv.changePostType=changePostType;function changePostType(){switch(mv.newPost.type){case'note':mv.button='Đăng ghi chú';break;case'poll':mv.button='Đăng bài thăm dò ý kiến';break;case'notification':mv.button='Đăng thông báo';break;case'event':mv.button='Đăng thu bài tập';break;default:mv.button='Đăng câu hỏi';}}
function createPost(){if(mv.newPost.type=='event'){var str=mv.time_end_event;var time=moment(str,mv.date_format);mv.newPost.event_end=time.valueOf();}
PostService.createPost(mv.newPost).then(function(data){var newPost=data.data;var post_id=newPost.id;$location.path('/class/'+mv.class_id+'/post/'+post_id);},function(error){var data=error.data;var message=data.message;NotificationService.error(message);});}});})(moment);(function(){'use strict';angular.module('app.core').controller('EditPostController',function($state,$stateParams,StorageService,PostService,ClassService,PageValues,NotificationService,BreadCrumbsService){var mv=this;PageValues.title='Sửa bài';mv.button='Cập nhật';mv.data=PageValues;mv.class_id=$stateParams.classId;mv.post_id=$stateParams.postId;mv.user=StorageService.getUserData();mv.isTeacher=(mv.user.capability=='teacher');mv.tinymceOptions={plugins:['advlist autolink lists link image charmap print preview anchor','searchreplace visualblocks code fullscreen','insertdatetime media table contextmenu paste code'],toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',content_css:'//www.tinymce.com/css/codepen.min.css'};mv.update=update;PostService.getPost(mv.post_id).then(function(data){var post=data.data;if(!post.author){$state.go('class');return;}
if(post.author.id!=mv.user.id){$state.go('class');return;}
var class_id=post.class_id;if(class_id!==mv.class_id){$state.go('posts.list.edit',{postId:mv.post_id,classId:mv.class_id});}
mv.post=post;mv.post.is_incognito+='';PageValues.title=post.title;var breadcrumbs=[{href:$state.href('class'),title:'Danh sách lớp'},{href:$state.href('posts.list',{classId:post.class.id}),title:post.class.name},{title:'Sửa bài viết'}];BreadCrumbsService.update(breadcrumbs);},function(error){NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng tải lại trang.');});function update(){var args={post_id:mv.post.id,title:mv.post.title,content:mv.post.content,is_incognito:mv.post.is_incognito,type:mv.post.type};PostService.updatePost(args).then(function(data){NotificationService.success('Cập nhật bài viết thành công.');$state.go('posts.list.detail',{postId:mv.post_id,classId:mv.class_id});},function(error){NotificationService.error('Đã có lỗi gì đó xảy ra. Vui lòng thử lại sau!');});}});})();(function(){'use strict';angular.module('app.services').factory('PageSupportService',classService);function classService($q,StorageService,APIService){return{submitSupport:submitSupport};function submitSupport(data){var deferred=$q.defer();APIService.makeRequest({url:'/sendsupport',method:'POST',data:data}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}}})();(function(){'use strict';angular.module('app.services').factory('AccountService',accountService);function accountService($q,StorageService,APIService){return{login:login,logout:logout,getProfile:getProfile,updateProfile:updateProfile,changePassword:changePassword,resetPassword:resetPassword,newPassword:newPassword};function login(email,password){var deferred=$q.defer();var dataPOST={email:email,password:password};APIService.makeRequest({url:'/login',method:'POST',data:dataPOST}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}
function logout(){var deferred=$q.defer();APIService.makeRequestAuth({url:'/logout',method:'GET'}).then(function(data){deferred.resolve(data);},function(error){deferred.resolve(error);});return deferred.promise;}
function getProfile(){var deferred=$q.defer();var token=StorageService.getToken();APIService.makeRequest({url:'/profile',method:'GET',headers:{'Authorization':token}}).then(function(response){deferred.resolve(response.data);},function(error){deferred.resolve(error);});return deferred.promise;}
function updateProfile(data){var deferred=$q.defer();APIService.makeRequestAuth({url:'/profile',method:'POST',data:data}).then(function(response){deferred.resolve(response.data);},function(error){deferred.resolve(error);});return deferred.promise;}
function changePassword(old_pass,new_pass,confirm_pass){var data={old_password:old_pass,new_password:new_pass};var deferred=$q.defer();APIService.makeRequestAuth({url:'/changepass',method:'POST',data:data}).then(function(response){deferred.resolve(response.data);},function(error){deferred.resolve(error);});return deferred.promise;}
function resetPassword(email,code){var data={email:email,code:code};var deferred=$q.defer();APIService.makeRequestAuth({url:'/sendresetpass',method:'POST',data:data}).then(function(response){deferred.resolve(response.data);},function(error){deferred.resolve(error);});return deferred.promise;}
function newPassword(token,password){var data={new_password:password};var deferred=$q.defer();APIService.makeRequest({url:'/resetpass',method:'POST',data:data,headers:{'Authorization':token}}).then(function(response){deferred.resolve(response.data);},function(error){deferred.resolve(error);});return deferred.promise;}}})();(function(){'use strict';angular.module('app.services').factory('ClassService',classService);function classService($q,StorageService,APIService){return{getClasses:getClasses};function getClasses(){var deferred=$q.defer();var token=StorageService.getToken();APIService.makeRequest({url:'/classes',method:'GET',headers:{'Authorization':token}}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}}})();(function(){'use strict';angular.module('app.services').factory('PostService',postService);function postService($q,StorageService,APIService){return{getListPost:getListPost,getPost:getPost,createPost:createPost,updatePost:updatePost,comment:comment,votePost:votePost,deletePost:deletePost,voteComment:voteComment,devoteComment:devoteComment,solve:solve};function getListPost(class_id,page){var deferred=$q.defer();var page_number=page||1;APIService.makeRequestAuth({url:'/posts/'+class_id+'/page/'+page_number,method:'GET'}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}
function getPost(post_id){var deferred=$q.defer();APIService.makeRequestAuth({url:'/post/'+post_id,method:'GET'}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}
function comment(data){var deferred=$q.defer();var token=StorageService.getToken();APIService.makeRequest({url:'/cmt',method:'POST',data:data,headers:{'Authorization':token}}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}
function votePost(post_id,type){var deferred=$q.defer();var token=StorageService.getToken();var data={post_id:post_id,content:type+''};APIService.makeRequest({url:'/votepost',method:'POST',data:data,headers:{'Authorization':token}}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}
function voteComment(data){var deferred=$q.defer();var token=StorageService.getToken();APIService.makeRequest({url:'/votecmt',method:'POST',data:data,headers:{'Authorization':token}}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}
function devoteComment(data){var deferred=$q.defer();var token=StorageService.getToken();APIService.makeRequest({url:'/devotecmt',method:'POST',data:data,headers:{'Authorization':token}}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}
function solve(comment_id){var deferred=$q.defer();var data={comment_id:comment_id};APIService.makeRequestAuth({url:'/solve',method:'POST',data:data}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}
function createPost(data){var deferred=$q.defer();var token=StorageService.getToken();APIService.makeRequest({url:'/post',method:'POST',data:data,headers:{'Authorization':token}}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}
function deletePost(post_id){var deferred=$q.defer();var token=StorageService.getToken();APIService.makeRequest({url:'/deletepost',method:'POST',data:{post_id:post_id},headers:{'Authorization':token}}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}
function updatePost(data){var deferred=$q.defer();APIService.makeRequestAuth({url:'/updatepost',method:'POST',data:data}).then(function(response){deferred.resolve(response.data);},function(error){deferred.reject(error);});return deferred.promise;}}})();(function(){'use strict';angular.module('app.services').factory('StorageService',StorageService);function StorageService(localStorageService){return{getToken:getToken,setToken:setToken,setUserData:setUserData,getUserData:getUserData,clearAll:clearAll};function getToken(){return localStorageService.get('user_token');}
function setToken(token){return localStorageService.set('user_token',token);}
function setUserData(user){return localStorageService.set('user_data',user);}
function getUserData(){return localStorageService.get('user_data');}
function clearAll(){return localStorageService.clearAll();}}})();(function(){'use strict';angular.module('app.core').value('PageValues',{loading:false,isAuthenticated:false,user:{},token:'',title:'Edoo App',breadcrumbs:[]});})();(function(){'use strict';angular.module('app.services').factory('AuthService',AuthService);function AuthService(StorageService){return{isAuthorized:isAuthorized};function isAuthorized(){var token=StorageService.getToken();return Boolean(token);}}})();(function(){'use strict';angular.module('app.services').constant('BASE_URL','http://api-v2.uetf.me').factory('APIService',APIService);function APIService($http,$q,BASE_URL,StorageService){return{makeRequest:makeRequest,makeRequestAuth:makeRequestAuth};function makeRequest(config){var deferred=$q.defer();config=config||{};config.url=BASE_URL+config.url;$http(config).then(function(response){deferred.resolve(response);},function(error){deferred.reject(error);});return deferred.promise;}
function makeRequestAuth(config){var token=StorageService.getToken();config.headers={'Authorization':token};return makeRequest(config);}}})();(function(){'use strict';angular.module('app.services').factory('HTTPInterceptor',HTTPInterceptor);function HTTPInterceptor($q,$rootScope){return{'request':function(config){return config;},'requestError':function(rejection){$rootScope.$emit('requestError',rejection);return $q.reject(rejection);},'response':function(response){return response;},'responseError':function(rejection){if(rejection.status==401){$rootScope.$emit('unauthorized',rejection);}
return $q.reject(rejection);}};}})();(function(){'use strict';angular.module('app.services').factory('EventService',EventService).run(runs);function EventService(StorageService){}
function runs($rootScope,$state,PageValues,StorageService,AuthService){$rootScope.$on('unauthorized',function(event,args){StorageService.clearAll();updateValues();return $state.go('login');});$rootScope.$on('loginSuccess',function(event,args){StorageService.setUserData(args.data.user);StorageService.setToken(args.data.token);updateValues();});$rootScope.$on('logoutSuccess',function(event,args){StorageService.clearAll();updateValues();});function updateValues(){var token=StorageService.getToken();PageValues.isAuthenticated=AuthService.isAuthorized();PageValues.token=token;PageValues.user=StorageService.getUserData();}
updateValues();}})();(function(){'use strict';angular.module('app.services').factory('NotificationService',NotificationService);function NotificationService(){return{error:error,success:success,warning:warning,information:information,confirm:confirm};function confirm(content){return _add(content,'confirm');}
function information(content){return _add(content,'information');}
function warning(content){return _add(content,'warning');}
function error(content){return _add(content,'error');}
function success(content){return _add(content,'success');}
function _add(content,type){type=type||'success';return noty({layout:'topRight',text:content,type:type,animation:{open:'animated bounceInRight',close:'animated bounceOutRight'},timeout:3000,closeWith:['click'],killer:true,theme:'edoo'});}}})();(function(){'use strict';angular.module('app.services').factory('BreadCrumbsService',BreadCrumbsService);function BreadCrumbsService($rootScope){return{update:update};function update(data){$rootScope.$emit('updateBreadcrumbs',data);}}})();(function(){'use strict';angular.module('app.core').directive('edNavbar',edNavbar);function edNavbar(){return{templateUrl:'templates/components/navbar.html',restrict:'A',controller:'NavbarController',controllerAs:'navbarCtrl'};}})();(function(){'use strict';angular.module('app.core').directive('edFooter',edFooter);function edFooter(){return{templateUrl:'templates/components/footer.html',restrict:'A',controller:'FooterController',controllerAs:'footerCtrl'};}})();