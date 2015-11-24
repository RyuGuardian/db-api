'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gulpMocha = require('gulp-mocha');

gulp.task('jshint', function() {
	return gulp.src(['test/**/*.js', 'lib/**/*.js', 'models/**/*', 'routes/**/*', 'server.js', 'gulpfile.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
	return gulp.src('test/**/*test.js')
		.pipe(gulpMocha());
});

gulp.task('default', ['jshint', 'test']);