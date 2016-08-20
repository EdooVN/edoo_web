(function ($) {
    $(document).ready(function () {
        tinymce.init({
            selector: '.create-post-content',  // note the comma at the end of the line!
            plugins: 'code',  // note the comma at the end of the line!
            toolbar: 'code'
        });
    });
})(jQuery);