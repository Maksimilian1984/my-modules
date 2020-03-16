const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();

const lessFiles = [
    './less/font.less',
    './less/body.less'
]

function styles() {
    return gulp.src(lessFiles)

        .pipe(concat('style.less'))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream())

}

function clean() {
    return del(['build/*'])

}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }});

    gulp.watch('./less/**/*.css', styles);
    gulp.watch("./*.html").on('change', browserSync.reload);

};

gulp.task('styles', styles);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles)));
gulp.task('dev', gulp.parallel('build', 'watch'));




