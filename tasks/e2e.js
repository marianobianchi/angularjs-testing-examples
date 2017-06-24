'use strict';
/* jshint camelcase: false */

var config = require('./config');
var gulp = require('gulp');

var protractor = require('gulp-protractor');


gulp.task('protractor', ['protractor:src']);
gulp.task('e2e', [
    'webdriver-update'
], runProtractor);


gulp.task('webdriver-update', protractor.webdriver_update);
gulp.task('webdriver-standalone', protractor.webdriver_standalone);

function runProtractor(done) {
    gulp.src('.nonononoNOTHING')
        .pipe(protractor.protractor({
            configFile: './karma-e2e.conf.js',
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        })
        .on('end', function() {
            done();
        });
}
