const path = require('path');

const gulp = require('gulp');
const sass = require('gulp-sass');

const SCSS_SRC_FOLDER = path.resolve(__dirname, 'app/scss/');
const SCSS_SRC_FILES = path.resolve(__dirname, SCSS_SRC_FOLDER, '**/*.scss');
const SCSS_SRC_FILE = path.resolve(__dirname, SCSS_SRC_FOLDER, 'main.scss');
const SCSS_BUILD_FOLDER = path.resolve(__dirname, 'app/public/static/css/');

gulp.task('build:scss', function () {
  return gulp.src(SCSS_SRC_FILE)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(SCSS_BUILD_FOLDER));
});

gulp.task('build:watch:scss', ['build:scss'], function() {
  gulp.watch(SCSS_SRC_FILES, ['build:scss']);
});

gulp.task('default', ['build:watch:scss']);