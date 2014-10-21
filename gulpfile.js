var gulp = require('gulp'),
    browserify = require('browserify'),
    browserSync = require('browser-sync'),
    del = require('del'),
    deploy = require('gulp-gh-pages'),
    jade = require('gulp-jade'),
    run = require('run-sequence'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream');
var reload = browserSync.reload;

// paths
const HTML_SRC = 'src/**/*.jade',
      CSS_SRC = 'src/**/*.scss',
      JS_MAIN = ['./src/js/demo.js'],
      JS_SRC = './src/js/*.js*',
      DEST = 'dist',
      DEPLOY = 'dist/**/*';

gulp.task('build:js', function () {
    return browserify({
        entries: JS_MAIN,
        debug: true
    }).bundle()
        .pipe(source('js/demo.js'))
        .pipe(gulp.dest(DEST))
        .pipe(reload({stream: true}));
});

gulp.task('build:jade', function () {
    return gulp.src(HTML_SRC)
        .pipe(jade())
        .pipe(gulp.dest(DEST))
        .pipe(reload({stream: true}));
});

gulp.task('build:sass', function () {
    return gulp.src(CSS_SRC)
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest(DEST))
        .pipe(reload({stream: true}));
});

gulp.task('clean', function (cb) {
    del(DEST, cb);
});

gulp.task('preview', function () {
    browserSync({
        server: {
            baseDir: DEST
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(HTML_SRC, ['build:jade']);
    gulp.watch(CSS_SRC, ['build:sass']);
    gulp.watch(JS_SRC, ['build:js']);
});

gulp.task('build', function (cb) {
    run('clean', [
        'build:jade',
        'build:sass',
        'build:js'
    ], cb);
});

gulp.task('dev', function (cb) {
    run('build',
        'preview',
        'watch',
        cb);
});

gulp.task('deploy', ['build'], function () {
    return gulp.src(DEPLOY)
        .pipe(deploy({
            branch: 'master',
            cacheDir: '.tmp'
        }));
});

gulp.task('default', ['dev']);
