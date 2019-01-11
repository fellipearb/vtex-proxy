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

var hub = new HubRegistry(['./src/common/gulpfile-common-dev.js']);

let bases = {
    src: './src',
    build: {
        path: './build/arquivos',
        images: './build/arquivos/images',
        icons: './build/arquivos/icons'
    }
},
paths = {
    common: {
        sass: bases.src + '/common/routes/**/*.scss',
        scripts: bases.src + '/common/routes/**/*.js',
        images: [bases.src + '/common/assets/**/*.png', bases.src + '/common/assets/**/*.jpg', bases.src + '/common/assets/**/*.gif'],
    }
},
imageCompress = {};

gulp.task('clean', () => {
    return gulp.src(bases.build.path)
        .pipe(clean())
});

gulp.task('browserSync', () => {
    browserSync.init({
        open: false,
        ui: false,
        logLevel: "debug",
        https: config.https || true,
        host: config.accountName + '.vtexlocal.com.br',
        startPath: '/admin/login/',
        proxy: 'https://' + config.accountName + '.vtexcommercestable.com.br',
        serveStatic: [{
            route: ['/files', '/arquivos'],
            dir: [
                bases.build.path,
                bases.build.images,
                bases.build.icons
            ]
        }]
    })
});

gulp.task('browserReload', (cb) => {
    browserSync.reload();
    cb();
});

gulp.task('watch:common-dev', () => {
    gulp.watch(paths.common.sass, ['sass:common-dev']);
    gulp.watch(paths.common.scripts, function() {
        gulp.run('scripts:common-dev', 'browserReload');
    });
    gulp.watch(paths.common.images, function() {
        gulp.run('images:common-dev', 'browserReload');
    });
});

gulp.task('dev', () => {
    runSequence('clean', ['images:common-dev', 'sass:common-dev', 'scripts:common-dev'], 'browserSync', 'watch:common-dev');
})

gulp.task('prod', () => {
    setEnv('prod')
    //runSequence('clean', 'images', 'images:checkout', ['copy', 'sass', 'sass:checkout', 'scripts', 'scripts:checkout'])
})

gulp.task('default', () => {
    console.log('Check package json to run tasks');
})