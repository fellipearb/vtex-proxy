var gulp = require("gulp");
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var source = {
    src: './src',
    buid: '/buid/arquivos'
},
paths = {
    sass: source.src + '/sass/**/*.scss',
    js: source.src + '/js/**/*.scss',
    images: source.src + '/images/**/*./[jpg,png,gif]/'
},
configs = {
    accountName: 'chillibeans'
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
        // https: true,
        host: configs.accountName + '.vtexlocal.com.br',
        startPath: '/',
        proxy: 'http://loja.'+ configs.accountName + '.com.br',
        serveStatic: [{
            route: '/arquivos',
            dir: ['./build/arquivos']
        }]
    });

    gulp.watch([paths.sass], ['sass']);
});