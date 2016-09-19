var gulp = require('gulp'),
    watch = require('gulp-watch'),
    live_reload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    source_maps = require('gulp-sourcemaps');

// Default Task
gulp.task('default', ['watch']);

gulp.task('watch', function () {
    live_reload.listen();
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/**/*.scss', ['sass']);
});

gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(live_reload());
});

gulp.task('js', function () {
    gulp.src('app/*.js')
        .pipe(live_reload());
});

gulp.task('sass', function () {
    return gulp.src('app/assets/scss/main.scss')
        .pipe(source_maps.init())
        .pipe(sass())
        .pipe(source_maps.write())
        .pipe(gulp.dest('app/assets/css'))
        .pipe(live_reload());
});