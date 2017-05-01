var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    shorthand = require('gulp-shorthand'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglifyjs');


// Default task

gulp.task('default', ['serve']);

// Convert SASS to CSS

gulp.task('sass-compile', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});


// browserSync
gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("sass/*.scss", ['sass-compile']).on('change', browserSync.reload);
    gulp.watch("./**/*.css").on('change', browserSync.reload);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});

// autoprefixer
gulp.task('prefix',['shorthand'], () =>
    gulp.src('./css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
);

// Shorthand css
gulp.task('shorthand', function () {
	return gulp.src('./css/*.css')
		.pipe(shorthand())
		.pipe(gulp.dest('./css'));
});


// Modify CSS
gulp.task('cssg', ['prefix']);

// Uglify JS

gulp.task('uglify', function() {
  gulp.src('./js/*.js')
    .pipe(uglify('main.js'))
    .pipe(gulp.dest('./js/'))
});
