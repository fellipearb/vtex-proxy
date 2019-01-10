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
    build: './build/arquivos',
},
paths = {
    common: {
        sass: bases.src + '/common/routes/**/*.scss',
        scripts: bases.src + '/common/routes/**/*.js'
    },
    sass: bases.src + '/sass/**/*.scss',
    sassCheckout: bases.src + '/checkout/sass/**/*.scss',
    scripts: bases.src + '/js/**/*.js',
    images: [bases.src + '/images/**/*.png', bases.src + '/images/**/*.jpg', bases.src + '/images/**/*.gif'],
    copy: [bases.src + '/**/*.eot', bases.src + '/**/*.svg', bases.src + '/**/*.woff', bases.src + '/**/*.woff2']
},
environment = undefined,
sassStyle = {},
imageCompress = {},
setEnv = (env) => {
    environment = env
    
    if( env == 'prod' ) {
        sassStyle = {'sourcemap=none': true, noCache: true, outputStyle: 'compressed'}
        imageCompress = {optimizationLevel: 5, progressive: true}
    }
}

gulp.task('clean', () => {
    return gulp.src(bases.build + '/../')
        .pipe(clean())
})

gulp.task('copy', () => {
    gulp.src(paths.copy)
        .pipe(gulp.dest(bases.build))
})

gulp.task('sass', () => {
    let scss = gulp.src(paths.sass)
        .pipe(sass(sassStyle).on('error', sass.logError))
    
    if(environment == 'dev')
        scss.pipe(sourcemaps.write())    

        scss.pipe(gulp.dest(bases.build))
        scss.pipe(browserSync.stream())

    return scss
})

gulp.task('scripts', ['browserReload'], () => {
    let script = gulp.src(paths.scripts)

    if(environment == 'prod')
        script.pipe(uglify())

    script.pipe(gulp.dest(bases.build))

        return script
})

gulp.task('images', () => {
    return gulp.src(paths.images)
        .pipe(imagemin(imageCompress))
        .pipe(gulp.dest(bases.build))
})

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
            dir: [bases.build + '/../files', bases.build]
        }]
    })
});

gulp.task('browserReload', (cb) => {
    browserSync.reload();
    cb();
});


gulp.task('watch', () => {
    gulp.watch([paths.sass], ['sass'])
    gulp.watch([paths.sassCheckout], ['sass:checkout'])
    gulp.watch([paths.scripts], ['scripts'])
    gulp.watch(paths.images, ['images'])
    gulp.watch(paths.fonts, ['copy'])
});



gulp.task('watch:common-dev', () => {
    gulp.watch(paths.common.sass, ['sass:common-dev']);
    gulp.watch(paths.common.scripts, function() {
        gulp.run('scripts:common-dev', 'browserReload');
    });
});



gulp.task('dev', () => {
    setEnv('dev')
    runSequence('clean', ['images', 'copy', 'sass:common-dev', 'scripts:common-dev', 'sass', 'scripts'], 'browserSync', 'watch', 'watch:common-dev')
})

gulp.task('prod', () => {
    setEnv('prod')
    //runSequence('clean', 'images', 'images:checkout', ['copy', 'sass', 'sass:checkout', 'scripts', 'scripts:checkout'])
})

gulp.task('default', () => {
    console.log('Check package json to run tasks')
})