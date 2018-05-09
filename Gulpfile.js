var fs = require('fs');
var gulp = require("gulp");
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var config = JSON.parse(fs.readFileSync('configs.json'));

var source = {
    src: './src',
    buid: '/buid/arquivos'
},
paths = {
    sass: source.src + '/sass/**/*.scss',
    js: source.src + '/js/**/*.scss',
    images: source.src + '/images/**/*./[jpg,png,gif]/'
}

gulp.task('sass', function () {
    return gulp.src(paths.sass)
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
        codeSync: true,
        minify: true,
        open: "external",
        https: config.https || true,
        host: config.accountName + '.vtexlocal.com.br',
        startPath: '/',
        proxy: 'https://' + config.accountName + '.vtexcommercestable.com.br',
        serveStatic: [{
            route: '/arquivos',
            dir: ['./build/arquivos']
        }]
    });

    gulp.watch([paths.sass], ['sass']);
});