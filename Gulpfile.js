var fs = require('fs');
var gulp = require("gulp");
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var config = JSON.parse(fs.readFileSync('conf/config.json'));
var paths = JSON.parse(fs.readFileSync('conf/paths.json'));

var source = {
    src: './src',
    buid: '/buid/arquivos'
}

gulp.task('sass', function () {
    return gulp.src(source.src + paths.sass)
        .pipe(sass({
            'sourcemap=none': true,
            noCache: true,
            style: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./build/arquivos/'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function () {
    browserSync.init({
        https: true,
        host: config.accountName + '.vtexlocal.com.br',
        startPath: '/',
        proxy: 'https://' + config.accountName + '.com.br',
        serveStatic: [{
            route: '/arquivos',
            dir: ['./build/arquivos']
        }]
    });

    gulp.watch([paths.sass], ['sass']);
});