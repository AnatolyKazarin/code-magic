"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("script", function() {
  gulp.src("js/*.js")
    .pipe(plumber())
    .pipe(gulp.dest("js"))
    .pipe(server.stream());
});

gulp.task("serve", ["script"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("js/*.js", ["script"]);
  gulp.watch("*.html").on("change", server.reload);
});
