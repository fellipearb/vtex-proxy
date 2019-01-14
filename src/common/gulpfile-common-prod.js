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
    build: '../../build/arquivos'
},
paths = {
    sass:    ['./routes/**/*.scss'],
    images:  ['./assets/**/*.png', './assets/**/*.jpg', './assets/**/*.gif'],
    scripts: ['./routes/**/*.js'],
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


gulp.task('sass:common-prod', () => {
    return gulp.src(paths.sass)
        .pipe(sass(sassStyle).on('error', sass.logError))
        .pipe(concat(config.fileName + '-common.min.css'))
        .pipe(gulp.dest(bases.build))
        .pipe(browserSync.stream());
});

gulp.task('scripts:common-prod', () => {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat(config.fileName + '-common.min.js'))
        .pipe(gulp.dest(bases.build));
});

gulp.task('images:common-prod', () => {
    return gulp.src(paths.images)
        .pipe(imagemin(imageCompress))
        .pipe(gulp.dest(bases.build));
});

