var fs          = require('fs')
var gulp        = require("gulp")
var sass        = require('gulp-sass')
var uglify      = require('gulp-uglify')
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
scriptCompress = {
    compress: true,
    toplevel: true
},
sassStyle = {
    'sourcemap=none': true,
    noCache: true,
    outputStyle: 'compressed'
},
imageCompress = {
    optimizationLevel: 5,
    progressive: true
};

gulp.task('sass:checkout-prod', () => {
    return gulp.src(paths.sass)
        .pipe(sass(sassStyle).on('error', sass.logError))
        .pipe(concat(config.fileName + '-checkout.min.css'))
        .pipe(gulp.dest(bases.build));
});

gulp.task('scripts:checkout-prod', () => {
    return gulp.src(paths.scripts)
        .pipe(concat(config.fileName + '-checkout.min.js'))
        .pipe(uglify(scriptCompress))
        .pipe(gulp.dest(bases.build));
});

gulp.task('images:checkout-prod', () => {
    return gulp.src(paths.images)
        .pipe(imagemin(imageCompress))
        .pipe(gulp.dest(bases.build));
});

