var fs          = require('fs')
var gulp        = require("gulp")
var path        = require('path')
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
    
    function getFolders(dir) {
        return fs.readdirSync(dir).filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
    }

    var folders = getFolders("./routes");
    var prefixFile = config.fileName + "-";

    var tasks = folders.map(function(folder) {
        return gulp.src(path.join("./routes", folder, '/**/*.scss'))
        .pipe(sass(sassStyle).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min',
            prefix: prefixFile
        })).pipe(rename(function (path) {
            path.basename = path.basename.replace('controller.', '');
        }))
        .pipe(gulp.dest(bases.build));
   });

});

gulp.task('scripts:website-dev', () => {

    function getFolders(dir) {
        return fs.readdirSync(dir).filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
    }

    var folders = getFolders("./routes");
    var prefixFile = config.fileName + "-";

    var tasks = folders.map(function(folder) {
        return gulp.src(path.join("./routes", folder, '/**/*.js'))
        .pipe(rename({
            suffix: '.min',
            prefix: prefixFile
        })).pipe(rename(function (path) {
            path.basename = path.basename.replace('controller.', '');
        }))
        .pipe(gulp.dest(bases.build));
   });

});

gulp.task('images:website-dev', () => {
    return gulp.src(paths.images)
        .pipe(imagemin(imageCompress))
        .pipe(gulp.dest(bases.build))
});

