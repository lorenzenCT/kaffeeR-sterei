const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

gulp.task('styles', () => {
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./web/media/css/'));
});

gulp.task('watch', () => {
    gulp.watch('app/scss/**/*.scss', (done) => {
        gulp.series(['styles'])(done);
    });
});

gulp.task('default', gulp.series(['watch']));