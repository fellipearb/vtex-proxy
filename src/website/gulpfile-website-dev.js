var fs          = require('fs')
var gulp        = require("gulp")
var clean       = require('gulp-clean')
var sass        = require('gulp-sass')
var concat      = require('gulp-concat')
var uglify      = require('gulp-uglify')
var imagemin    = require('gulp-imagemin')
var sourcemaps  = require('gulp-sourcemaps')
var rename      = require("gulp-rename")
var browserSync = require('browser-sync').create()
var runSequence = require('run-sequence')
var config      = JSON.parse(fs.readFileSync('configs.json'))

let bases = {
    src:   './src',
    build: '../../build'
},
paths = {
    sass:    ['./routes/**/*.scss'],
    images:  ['./assets/images/**/*.png', './assets/images/**/*.jpg', './assets/images/**/*.gif'],
    scripts: ['./routes/**/*.js'],
},
sassStyle = {
    noCache: true
},
imageCompress = {};

gulp.task('sass:website-dev', () => {
    return gulp.src(paths.sass)
        .pipe(sass(sassStyle).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min',
            prefix: config.fileName
        })).pipe(rename(function (path) {
            path.basename = path.basename.replace('controller.', '');
        }))
        .pipe(gulp.dest(bases.build));
});

gulp.task('scripts:website-dev', () => {
    return gulp.src(paths.scripts)
        .pipe(rename({
            suffix: '.min',
            prefix: config.fileName
        })).pipe(rename(function (path) {
            path.basename = path.basename.replace('controller.', '');
        }))
        .pipe(gulp.dest(bases.build))
});

gulp.task('images:website-dev', () => {
    return gulp.src(paths.images)
        .pipe(imagemin(imageCompress))
        .pipe(gulp.dest(bases.build))
});

