var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  globbing = require('gulp-css-globbing'),
  gutil = require('gulp-util'),
  autoprefixer = require('gulp-autoprefixer'),
  livereload = require('gulp-livereload'),
  srcs = require('../srcs');

gulp.task('sass', function() {
  return gulp.src(srcs.sass.main)
    .pipe(sourcemaps.init())
    .pipe(globbing({
      extensions: ['.scss', '.sass']
    }))
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'safari 5',
        'ie 8',
        'ie 9',
        'android 4'
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});