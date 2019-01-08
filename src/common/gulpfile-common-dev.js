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
    src: './src',
    build: '../../build'
},
paths = {
    sass: './routes/**/*.scss',
},
sassStyle = {
    noCache: true
}

gulp.task('clean', () => {
    return gulp.src(bases.build)
        .pipe(clean({force: true}))
})

gulp.task('sass:dev', function () {
    return gulp.src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass(sassStyle).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write( '.' ), {addComment: true})
        .pipe(concat(config.fileName + 'common.min.css'))
        .pipe(gulp.dest(bases.build));
});