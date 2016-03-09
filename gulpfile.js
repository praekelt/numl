var gulp = require('gulp');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var webpackConf = require('./webpack.config');


gulp.task('build', function() {
  return gulp.src('./src/index.js')
    .pipe(webpack(webpackConf))
    .pipe(gulp.dest('.'));
});


gulp.task('test', ['build'], function() {
  return gulp.src(['tests/setup.js', 'tests/**/*.test.js'])
    .pipe(mocha());
});


gulp.task('watch', function() {
  gulp.watch(['src/**/*.pegjs', 'src/**/*.js', 'tests/**/*.js'], ['default']);
});


gulp.task('default', ['test']);
