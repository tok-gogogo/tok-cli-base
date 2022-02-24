const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const replace = require('gulp-replace');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function (next) {
  gulp
    .src(['lib'], {
      allowEmpty: true,
    })
    .pipe(clean());
  next();
});

gulp.task('tsc', function (next) {
  gulp
    .src(tsProject.config.include)
    .pipe(tsProject())
    .pipe(gulp.dest(tsProject.config.compilerOptions.outDir));
  next();
});

gulp.task('tsc-build', function (next) {
  gulp
    .src(tsProject.config.include)
    .pipe(tsProject())
    .pipe(replace(/"use strict";/, ''))
    .pipe(replace(/([\s\S]*)\/\/env-node/, '#!/usr/bin/env node'))
    .pipe(gulp.dest(tsProject.config.compilerOptions.outDir));
  next();
});

gulp.task('watch', function (next) {
  gulp.watch('src/**/*.ts', gulp.series('tsc'));
  next();
});

exports.serve = gulp.series('clean', 'tsc', 'watch');

exports.default = exports.build = gulp.series('clean', 'tsc-build');
