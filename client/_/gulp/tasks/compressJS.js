var gulp   = require('gulp'),
  srcs = require('../srcs'),
  uglify = require('gulp-uglify');

gulp.task('compressJS', ['js'], function() {
  return gulp.src(srcs.js.production)
    .pipe(uglify())
    .pipe(gulp.dest(srcs.js.jsDir));
});