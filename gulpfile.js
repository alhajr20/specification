const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

gulp.task('server', function() {

  browserSync({
    server: {
      baseDir: "dist"
    }
  });

  gulp.watch("source/pug/*.pug").on('change', browserSync.reload);
});

gulp.task('styles', function() {
  return gulp.src("source/scss/**/*.+(scss|sass)")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch("source/scss/**/*.+(scss|sass|css)", gulp.parallel('styles'));
  gulp.watch("source/pug/*.pug").on('change', gulp.parallel('pug'));
  gulp.watch("source/js/**/*.js").on('change', gulp.parallel('scripts'));
  gulp.watch("source/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('pug', function () {
  return gulp.src("source/pug/*.pug")
    .pipe(plumber())
    .pipe(pug({
      pretty: false,
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task('scripts', function () {
  return gulp.src("source/js/**/*.js")
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task('images', function () {
  return gulp.src("source/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'pug', 'images'));