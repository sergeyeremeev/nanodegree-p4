var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    critical = require('critical').stream,
    imageop = require('gulp-image-optimization'),
    del = require('del');

// clean task to clean build folder before building an entire app
gulp.task('clean', function (cb) {
    del('build/**/*', cb);
});

// minify scripts
gulp.task('scripts', function () {
    gulp.src('dev/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

// minify styles
gulp.task('styles', function () {
    gulp.src('dev/**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('build'));
});

// minify html
gulp.task('html', function() {
  var opts = {
    empty: true,
    spare: true
  };

  return gulp.src('dev/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('build'));
});

// inject minified critical css into already minified html files (only from dev
// root folder).
gulp.task('html-critical', ['html'], function () {
    gulp.src('build/*.html')
        .pipe(critical({base: './', inline: true, css: 'dev/css/style.css', width: 1920, height: 1200, minify: true}))
        .pipe(gulp.dest('build'));
});

// optimize images
gulp.task('images', function(cb) {
    gulp.src(['dev/**/*.png','dev/**/*.jpg','dev/**/*.gif','dev/**/*.jpeg'])
        .pipe(imageop({
            optimizationLevel: 4,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('build'));
});

// default build task to clean build directory, then create the correct folder
// structure with minified files, optimized images and inline critical css.
gulp.task('default', ['clean'], function () {
    gulp.start('scripts', 'styles', 'html-critical', 'images');
});
