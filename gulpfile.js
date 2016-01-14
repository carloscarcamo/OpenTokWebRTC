'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence'); // run tasks in sequence
var del = require('del');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var concat = require('gulp-concat');


var config = {
  paths: {
    dist: './public/dist',
    dist_js: './public/dist/js',
    build: './public/build',
    js: './public/js/*.js',
    public: './public/js/'
  }
};

gulp.task('clean', function () {
  return del(config.paths.dist);
});

gulp.task('uglify', function () {
  return gulp.src(config.paths.js)
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist_js));
});

gulp.watch(config.paths.js, ['default']);


gulp.task('default', function() {
  //return runSequence('clean', 'browserify', 'js', 'clean_builds');
  return runSequence('clean', 'uglify');
});
