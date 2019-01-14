var fs          = require('fs')
var gulp        = require("gulp")
var HubRegistry = require('gulp-hub')
var clean       = require('gulp-clean')
var sass        = require('gulp-sass')
var concat      = require('gulp-concat')
var uglify      = require('gulp-uglify')
var imagemin    = require('gulp-imagemin')
var sourcemaps  = require('gulp-sourcemaps')
var rename      = require("gulp-rename")
var browserSync = require('browser-sync').create('app')
var runSequence = require('run-sequence')
var config      = JSON.parse(fs.readFileSync('configs.json'))

var hub = new HubRegistry([
    './src/common/gulpfile-common-prod.js',
    './src/website/gulpfile-website-prod.js',
    './src/checkout/gulpfile-checkout-prod.js'
]);

let bases = {
    src: './src',
    build: {
        base: './build',
        path: './build/arquivos'
    }
};

gulp.task('clean', () => {
    return gulp.src(bases.build.base)
        .pipe(clean())
});

gulp.task('default', () => {
    runSequence('clean', ['sass:common-prod', 'scripts:common-prod', 'images:common-prod', 'sass:website-prod', 'scripts:website-prod', 'images:website-prod', 'sass:checkout-prod', 'scripts:checkout-prod', 'images:checkout-prod']);
});