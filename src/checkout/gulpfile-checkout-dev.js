var fs          = require('fs')
var gulp        = require("gulp")
var sass        = require('gulp-sass')
var concat      = require('gulp-concat')
var imagemin    = require('gulp-imagemin')
var sourcemaps  = require('gulp-sourcemaps')
var browserSync = require('browser-sync').get('app')
var config      = JSON.parse(fs.readFileSync('configs.json'))

let bases = {
    src:   './src',
    build: '../../build/files'
},
paths = {
    sass:    ['./routes/**/*.scss'],
    images:  ['./assets/**/*.png', './assets/**/*.jpg', './assets/**/*.gif'],
    scripts: ['./routes/**/*.js'],
},
sassStyle = {
    noCache: true
},
imageCompress = {};

gulp.task('sass:checkout-dev', () => {
    return gulp.src(paths.sass)
        .pipe(sass(sassStyle).on('error', sass.logError))
        .pipe(concat("dev-" + config.fileName + '-checkout.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(bases.build))
        .pipe(browserSync.stream());
});

gulp.task('scripts:checkout-dev', () => {
    return gulp.src(paths.scripts)
        .pipe(concat("dev-" + config.fileName + '-checkout.min.js'))
        .pipe(gulp.dest(bases.build));
});

gulp.task('images:checkout-dev', () => {
    return gulp.src(paths.images)
        .pipe(imagemin(imageCompress))
        .pipe(gulp.dest(bases.build));
});

