const postcss = require('gulp-postcss')
const precss = require('precss')
const gulp = require('gulp')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const fs = require('fs')
const path = require('path')
const log = require('fancy-log')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')

const dirString = path.dirname(fs.realpathSync(__filename))

const src = {
    scss: dirString + '/src/styles/scss',
    css: dirString + '/src/styles/css',
    js: dirString + '/src/scripts',
    vendorCSS: dirString + '/src/vendor',
    vendorJS: dirString + '/src/vendor',
    critical: dirString + '/src/critical',
}

const dest = {
    css: dirString + '/assets/styles/',
    js: dirString + '/assets/scripts/',
    vendor: dirString + '/assets/vendor/',
    //critical: dirString + '/assets/critical/',
}

const plugins = [precss(), autoprefixer()]

const vendorCSS = () => {
    return gulp
        .src(src.vendorCSS + '/*.css')
        .pipe(concat('vendor.css'))
        .pipe(postcss([...plugins, cssnano()]))
        .pipe(gulp.dest(dest.vendor))
}

const vendorJS = () => {
    return gulp
        .src(src.vendorJS + '/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dest.vendor))
}

const mainJs = () => {
    return gulp
        .src(src.js + '/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest(dest.js))
}

const devSCSS = () => {
    return gulp
        .src(src.scss + '/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css))
}

const devCSS = () => {
    return gulp
        .src(src.css + '/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest(dest.css))
}

const prodCSS = () => {
    return gulp
        .src(src.css + '/*.css')
        .pipe(postcss([...plugins, cssnano()]))
        .pipe(gulp.dest(dest.css))
}

const criticalCSS = () => {
    return gulp
        .src(src.critical + '/*.css')
        .pipe(postcss([...plugins, cssnano()]))
        .pipe(replace(/(^)/g, '<style>\n$1'))
        .pipe(replace(/($)/g, '\n</style>$1'))
        .pipe(
            rename({
                basename: 'head.critical.css',
                extname: '.html',
            })
        )
        .pipe(gulp.dest('layouts/partials/'))
}

const criticalJS = () => {
    return gulp
        .src(src.critical + '/*.js')
        .pipe(uglify())
        .pipe(replace(/(^)/g, '<script type="text/javascript">\n$1'))
        .pipe(replace(/($)/g, '\n</script>$1'))
        .pipe(
            rename({
                basename: 'head.critical.js',
                extname: '.html',
            })
        )
        .pipe(gulp.dest('layouts/partials/'))
}

const watch = () => {
    const watcher = gulp.watch(src.js + '/*.js', mainJs)
    gulp.watch(src.scss + '/*.scss', devSCSS)
    gulp.watch(src.css + '/*.css', gulp.series([devCSS]))

    watcher.on('change', event => {
        log('File ' + event.path + ' was ' + event.type + ', running tasks...')
    })
}

gulp.task('watch', gulp.series([watch]))

gulp.task('default', gulp.series([devCSS]))

gulp.task(
    'build',
    gulp.series([criticalCSS, criticalJS, vendorJS, vendorCSS, prodCSS])
)

gulp.task('critical', gulp.series([criticalCSS, criticalJS]))

gulp.task('vendor', gulp.series([vendorJS, vendorCSS]))
