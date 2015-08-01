var gulp = require('gulp'),
  coffee = require('gulp-coffee'),
  gutil = require('gulp-util'),
  srcs = require('../srcs');

gulp.task('coffee', function() {
  return gulp.src(srcs.coffee.all)
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('_/scripts'));
});