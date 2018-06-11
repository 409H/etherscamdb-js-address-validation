var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('default', function() {
    gulp.src('src/esd.js')
        .pipe(minify())
        .pipe(gulp.dest('dist/'))
});