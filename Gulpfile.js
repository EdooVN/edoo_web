var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');

// Default Task
gulp.task('default', ['watch']);

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/*.js', ['js']);
});

gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(livereload());
});

gulp.task('js', function () {
    gulp.src('app/*.js')
        .pipe(livereload());
});