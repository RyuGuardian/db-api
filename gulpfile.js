var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');
var Karma = require('karma').Server;

gulp.task('jshint', function() {
  return gulp.src(['test/**/*.js', 'lib/**/*.js', 'models/**/*', 'routes/**/*', 'server.js', 'gulpfile.js', 'client/**/*.js'])
    .pipe(jshint({
      node: true,
      globals: {
        angular: true,
        expect: true
      }
    }))
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

gulp.task('webpack:test', function() {
  return gulp.src('./test/client/entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/client'));
});

gulp.task('staticfiles:dev', function() {
  gulp.watch('./client/**/*.html', ['staticfiles:dev']);
  
  return gulp.src('./client/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('servertests', function() {
  return gulp.src('test/api/**/*test.js')
    .pipe(mocha())
    .once('error', function(err) {
      console.log(err)
      process.exit(1);
    })
    .once('end', function() {
      if(this.seq.length === 1 && this.seq[0] === 'servertests') {
        process.exit();
      }
    }.bind(this));
})

gulp.task('karmatests', ['webpack:test'], function(done) {
  new Karma({configFile: __dirname + '/karma.conf.js'}, done)
    .start();
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);
