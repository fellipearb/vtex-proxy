var fs          = require('fs')
var gulp        = require("gulp")
var path        = require('path')
var HubRegistry = require('gulp-hub');
var clean       = require('gulp-clean')
var sass        = require('gulp-sass')
var uglify      = require('gulp-uglify')
var imagemin    = require('gulp-imagemin')
var sourcemaps  = require('gulp-sourcemaps')
var rename      = require("gulp-rename")
var browserSync = require('browser-sync').create()
var runSequence = require('run-sequence')
var config      = JSON.parse(fs.readFileSync('configs.json'))

var hub = new HubRegistry(['./src/common/gulpfile-common-dev.js', './src/website/gulpfile-website-dev.js']);

let bases = {
    src:   './src',
    build: './build'
}

gulp.task('clean', () => {
    return gulp.src(bases.build)
        .pipe(clean({force: true}))
})

gulp.task('browserSync', () => {
    browserSync.init({
        open: false,
        https: config.https || true,
        host: config.accountName + '.vtexlocal.com.br',
        startPath: '/admin/login/',
        proxy: 'https://' + config.accountName + '.vtexcommercestable.com.br',
        serveStatic: [{
            route: ['/files', '/arquivos'],
            dir: [bases.build]
        }]
    })
})

gulp.task('dev', () => {
	runSequence('clean', ['sass:common-dev', 'scripts:common-dev', 'images:common-dev', 'sass:website-dev', 'scripts:website-dev', 'images:website-dev', 'browserSync']);
})

gulp.task('default', () => {
    console.log('Check package json to run tasks');
})

