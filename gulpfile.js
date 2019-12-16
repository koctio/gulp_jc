var gulp = require('gulp'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');
    
gulp.task('browser-sync', function(){
    browserSync.init({
        server:{
            baseDir: './'
        }
    });
});

gulp.task('html', function () {
  return gulp.src('*.html')
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scss', function() {
  return gulp.src('template/scss/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'template/css',
      sass: 'template/scss'
    }))
    .pipe(autoprefixer({
        overrideBrowserslist: ["last 2 version"]
    }))
    .pipe(gulp.dest('template/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS())
    .pipe(gulp.dest('template/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function () {
  return gulp.src([
      'node_modules/slick-carousel/slick/slick.css',
      'node_modules/slick-carousel/slick/slick-theme.css',
      'node_modules/normalize.css/normalize.css',
      'node_modules/magnific-popup/dist/magnific-popup.css',
      'node_modules/animate.css/animate.css'
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('template/scss'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
  return gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
      'template/js/users.js'
  ])
    .pipe(concat('auto.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('template'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function() {
    gulp.watch('template/scss/*.scss', gulp.parallel('scss'));
    gulp.watch('template/js/*.js', gulp.parallel('js'));
    gulp.watch('*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('html', 'js', 'css', 'scss', 'browser-sync', 'watch'));
