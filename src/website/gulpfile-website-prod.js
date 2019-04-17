var fs          = require('fs')
var gulp        = require("gulp")
var path        = require("path")
var sass        = require('gulp-sass')
var uglify      = require('gulp-uglify')
var concat      = require('gulp-concat')
var imagemin    = require('gulp-imagemin')
var sourcemaps  = require('gulp-sourcemaps')
var rename      = require("gulp-rename")
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

function getFolders(dir) {
    return fs.readdirSync(dir).filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

gulp.task('sass:website-prod', () => {

    var folders = getFolders("./routes");
    var prefixFile = config.fileName + "-";

    var tasks = folders.map(function(folder) {
        return gulp.src(path.join("./routes", folder, '/**/*.scss'))
        .pipe(sass(sassStyle).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min',
            prefix: prefixFile
        })).pipe(rename(function (path) {
            path.basename = path.basename.replace('controller.', '');
        }))
        .pipe(gulp.dest(bases.build));
   });

});

gulp.task('scripts:website-prod', () => {

    var folders = getFolders("./routes");
    var prefixFile = config.fileName + "-";

    var tasks = folders.map(function(folder) {
        return gulp.src(path.join("./routes", folder, '/**/*.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min',
            prefix: prefixFile
        })).pipe(rename(function (path) {
            path.basename = path.basename.replace('controller.', '');
        }))
        .pipe(gulp.dest(bases.build));
   });

});

gulp.task('images:website-prod', () => {
    return gulp.src(paths.images)
        .pipe(imagemin(imageCompress))
        .pipe(gulp.dest(bases.build));
});

