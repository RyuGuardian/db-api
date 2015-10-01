var gulp = require('gulp');
var webpack = require('webpack-stream');

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
  return gulp.src('./client/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.watch('./client/**/*.html', ['staticfiles:dev']);
gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);
