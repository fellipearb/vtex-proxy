var fs = require('fs');
var gulp = require("gulp");
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var config = JSON.parse(fs.readFileSync('conf/configs.json'));

var source = {
    src: './src',
    buid: '/buid/arquivos'
}

gulp.task('sass', function () {
    return gulp.src(source.src + config.sass)
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
        https: config.https || true,
        host: config.accountName + '.vtexlocal.com.br',
        startPath: '/',
        proxy: 'https://' + config.accountName + '.vtexcommercestable.com.br',
        serveStatic: [{
            route: '/arquivos',
            dir: ['./build/arquivos']
        }]
    });

    gulp.watch([config.sass], ['sass']);
});