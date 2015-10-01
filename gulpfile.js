var gulp = require('gulp');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');

gulp.task('jshint', function() {
  return gulp.src(['test/**/*.js', 'lib/**/*.js', 'models/**/*', 'routes/**/*', 'server.js', 'gulpfile.js', 'client/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('webpack:dev', function() {
  return gulp.src('./client/js/app.js')
    .pipe(webpack({
      watch: true,
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('staticfiles:dev', function() {
  gulp.watch('./client/**/*.html', ['staticfiles:dev']);
  
  return gulp.src('./client/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);
