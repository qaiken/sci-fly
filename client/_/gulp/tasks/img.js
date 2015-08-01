var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  pngcrush = require('imagemin-pngcrush'),
  livereload = require('gulp-livereload'),
  srcs = require('../srcs');

gulp.task('img', function() {
  return gulp.src(srcs.img.all)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest('img'))
    .pipe(livereload());
});