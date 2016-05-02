const path = require('path');

const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const webpack = require("webpack");

/**
 * SASS tasks
 */
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

/**
 * Webpack tasks
 */
const compiler = webpack(require("./webpack.config"));

const printReport = function(stats) {
  gutil.log('[webpack]', stats.toString({
    modules: false,
    errorDetails: false,
    timings: false,
    cached: false,
    colors: true
  }));
};

gulp.task('build:webpack', function() {
  compiler.run(function(err, stats) {
    if(err) {
      gutil.log('error', new gutil.PluginError('[webpack]', err));
    }

    printReport(stats);
  });
});

gulp.task('build:watch:webpack', function() {
  compiler.watch({
    aggregateTimeout: 300
  }, function(err, stats) {
    if(err) {
      gutil.log('error', new gutil.PluginError('[webpack]', err));
    }

    printReport(stats);
  });
});

gulp.task('default', ['build:watch:scss', 'build:watch:webpack']);