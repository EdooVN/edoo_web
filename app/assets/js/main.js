(function ($) {
    $(document).ready(function () {

        $(window).on('http_start', function () {
            NProgress.start();
            console.log('start');
        }).on('http_complete', function () {
            NProgress.done();
        });

    });
})(jQuery);