var gulp = require('gulp');
var peg = require('gulp-peg');
var mocha = require('gulp-mocha');
var umd = require('gulp-wrap-umd');
var merge = require('merge-stream');
var concat = require('gulp-concat');


function compile() {
  return gulp.src('src/parser.pegjs')
    .pipe(peg({exportVar: ' var parser'}));
}


gulp.task('build', function() {
  return merge(compile(), gulp.src('src/numl.js'))
    .pipe(concat('numl.js'))
    .pipe(umd({
      exports: 'numl',
      namespace: 'numl'
    }))
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
