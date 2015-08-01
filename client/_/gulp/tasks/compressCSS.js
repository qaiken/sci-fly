var gulp      = require('gulp'),
    srcs      = require('../srcs'),
    minifyCSS = require('gulp-minify-css'),
    combineMQ = require('gulp-combine-mq');

gulp.task('compressCSS', ['sass'], function() {
  return gulp.src(srcs.sass.css)
    .pipe(combineMQ())
    .pipe(minifyCSS({advanced:false}))
    .pipe(gulp.dest(srcs.sass.cssDir));
});