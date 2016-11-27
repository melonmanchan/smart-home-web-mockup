'use strict';

var gulp     = require('gulp');
var gutil    = require('gulp-util');
var concat   = require('gulp-concat');
var gulpif   = require('gulp-if');
var babel    = require('gulp-babel');

var minimist = require('minimist');
var del = require('del');

var sass       = require('gulp-sass');
var minifyCSS  = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

var minifyHTML  = require('gulp-minify-html');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var minifyJS   = require('gulp-uglify');

var knownOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV      || 'development',
    }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('default', ['js', 'scss', 'html'],  function () { });

gulp.task('js', function () {
    return gulp.src(
        [
            './app/js/util.js',
            './app/js/**/*.js'
        ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulpif(options.env !== 'development', minifyJS({
            drop_console: true
        })))
        .pipe(concat('dist.js'))
        .pipe(gulp.dest('./dist/js/'))
 });

gulp.task('scss', function () {
    return gulp.src([
        './app/scss/*',
        './bower_components/html5-boilerplate/dist/css/*.css',
        './bower_components/material-design-lite/material.css'
        ])
        .pipe(sass())
       .pipe(gulpif(options.env !== 'development', minifyCSS()))
       .pipe(concat('app.css'))
       .pipe(gulpif(options.env === 'development', sourcemaps.write()))
       .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({stream : true}))
});

gulp.task('html', function () {
    return gulp.src(['./app/**/*.html'])
       .pipe(gulpif(options.env !== 'development', minifyHTML()))
       .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream : true}))
});

gulp.task('watch', ['default'],  function () {
    browserSync({
        https: false,
        server: { baseDir: 'dist/' }
    });

    var scss = gulp.watch('./app/scss/*.scss', ['scss'], { cwd: 'dist' }, reload);
    var html = gulp.watch(['./app/**/*.html'], ['html'], { cwd: 'dist' }, reload);
    var js   = gulp.watch('./app/js/**/*',     ['js'],   { cwd: 'dist' }, reload);

});

gulp.task('clean', function () {
    del('./dist');
});
