//---------------------------------
//
//  LiveReload uses chrome extension
//  no need to add script tag
//
//---------------------------------

var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  srcs = require('../srcs');

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(srcs.coffee.all, ['coffee']);
  gulp.watch(srcs.js.all, ['js']);
  gulp.watch(srcs.sass.all, ['sass']);
  gulp.watch(srcs.img.all, ['img']);
  gulp.watch(['*.html'], function(e) {
    server.changed(e.path);
  });
});