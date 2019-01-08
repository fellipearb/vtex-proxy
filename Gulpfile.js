var fs          = require('fs')
var gulp        = require("gulp")
var HubRegistry = require('gulp-hub');
var clean       = require('gulp-clean')
var sass        = require('gulp-sass')
var uglify      = require('gulp-uglify')
var imagemin    = require('gulp-imagemin')
var sourcemaps  = require('gulp-sourcemaps')
var rename      = require("gulp-rename")
var browserSync = require('browser-sync').create()
var runSequence = require('run-sequence')
var config      = JSON.parse(fs.readFileSync('configs.json'))

var hub = new HubRegistry(['./src/common/gulpfile-common-dev.js']);

gulp.task('default', ['clean', 'sass:dev']);