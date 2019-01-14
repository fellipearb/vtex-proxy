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
    './src/common/gulpfile-common-dev.js',
    './src/website/gulpfile-website-dev.js',
    './src/checkout/gulpfile-checkout-dev.js'
]);

let bases = {
    src: './src',
    build: {
        base: './build',
        path: './build/arquivos',
        images: './build/arquivos/images/',
        icons: './build/arquivos/icons'
    },
    checkout: {
        base: './build',
        path: './build/files',
        images: './build/files/images/',
        icons: './build/files/icons'
    }
},
paths = {
    common: {
        sass: bases.src + '/common/routes/**/*.scss',
        scripts: bases.src + '/common/routes/**/*.js',
        images: [bases.src + '/common/assets/**/*.png', bases.src + '/common/assets/**/*.jpg', bases.src + '/common/assets/**/*.gif'],
    },
    website: {
        sass: bases.src + '/website/routes/**/*.scss',
        scripts: bases.src + '/website/routes/**/*.js',
        images: [bases.src + '/website/assets/**/*.png', bases.src + '/website/assets/**/*.jpg', bases.src + '/website/assets/**/*.gif'],
    },
    checkout: {
        sass: bases.src + '/checkout/routes/**/*.scss',
        scripts: bases.src + '/checkout/routes/**/*.js',
        images: [bases.src + '/checkout/assets/**/*.png', bases.src + '/checkout/assets/**/*.jpg', bases.src + '/checkout/assets/**/*.gif'],
    }

},
imageCompress = {};

gulp.task('clean', () => {
    return gulp.src(bases.build.base)
        .pipe(clean())
});

gulp.task('browserSync', () => {

    browserSync.init({
        open: false,
        //ui: true,
        logConnections: config.logConnections || false,
        logFileChanges: config.logFileChanges || false,
        logLevel: config.logLevel || "info",
        logSnippet: true,
        https: config.https || true,
        host: config.accountName + '.vtexlocal.com.br',
        startPath: '/admin/login/',
        proxy: 'https://' + config.accountName + '.vtexcommercestable.com.br',
        serveStatic: [{
            route: ['/files', '/arquivos'],
            dir: [
                bases.build.path,
                bases.build.images,
                bases.build.icons,
                bases.checkout.path,
                bases.checkout.images,
                bases.checkout.icons
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
    gulp.watch(paths.common.scripts, ['scripts:common-dev', 'browserReload']);
    gulp.watch(paths.common.images, ['images:common-dev', 'browserReload']);
});

gulp.task('watch:website-dev', () => {
    gulp.watch(paths.website.sass, ['sass:website-dev']);
    gulp.watch(paths.website.scripts, ['scripts:website-dev', 'browserReload']);
    gulp.watch(paths.website.images, ['images:website-dev', 'browserReload']);
});

gulp.task('watch:checkout-dev', () => {
    gulp.watch(paths.checkout.sass, ['sass:checkout-dev']);
    gulp.watch(paths.checkout.scripts, ['scripts:checkout-dev', 'browserReload']);
    gulp.watch(paths.checkout.images, ['images:checkout-dev', 'browserReload']);
});

gulp.task('default', () => {
    runSequence('sass:common-dev', 'scripts:common-dev', 'images:common-dev', 'sass:website-dev', 'scripts:website-dev', 'images:website-dev', 'sass:checkout-dev', 'scripts:checkout-dev', 'images:checkout-dev', 'browserSync', 'watch:common-dev', 'watch:website-dev', 'watch:checkout-dev');
});