var postcss = require('gulp-postcss');
var precss = require('precss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var rev = require('gulp-rev');
var revDel = require('rev-del');
var fs = require('fs');
var path = require('path');
var log = require('fancy-log');
var critical = require('critical').stream;
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var dirString = path.dirname(fs.realpathSync(__filename));

var src = {
    css: dirString + '/src/styles/*.css',
    js: dirString + '/src/scripts/*.js',
    vendorCSS: dirString + '/src/vendor/*.css',
    vendorJS: dirString + '/src/vendor/*.js',
}

var dest = {
    css: dirString + '/static/assets/styles/',
    js: dirString + '/static/assets/scripts/',
    vendor: dirString + '/static/assets/vendor/',
}

var env;
env = process.env.NODE_ENV || 'development';

console.log('css src path is: ', src.css)
console.log('js src path is: ', src.js);
console.log('css dest path is: ', dest.css)
console.log('js dest path is: ', dest.js);

var plugins = [
    precss(),
    autoprefixer({
        browsers: ['last 1 version']
    }),
    cssnano()
];

gulp.task('vendorCSS', function() {
    return gulp.src(src.vendorCSS)
        .pipe(concat('vendor.css'))
        .pipe(postcss(plugins))
        .pipe(rev())
        .pipe(gulp.dest(dest.vendor))
        .pipe(rev.manifest(`${dest.vendor}rev-manifest.json`, {
            base: dest.vendor,
            merge: true
        }))
        .pipe(revDel({
            dest: dest.vendor
        }))
        .pipe(gulp.dest(dest.vendor));
});

gulp.task('vendorJS', function() {
    return gulp.src(src.vendorJS)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(dest.vendor))
        .pipe(rev.manifest(`${dest.vendor}rev-manifest.json`, {
            base: dest.vendor,
            merge: true
        }))
        .pipe(revDel({
            dest: dest.vendor
        }))
        .pipe(gulp.dest(dest.vendor));
});

gulp.task('buildCSS', function() {
    return gulp.src(src.css, src.vendorCSS)
        .pipe(postcss(plugins))
        .pipe(rev())
        .pipe(gulp.dest(dest.css))
        .pipe(rev.manifest(`${dest.css}rev-manifest.json`, {
            base: dest.css,
            merge: true
        }))
        .pipe(revDel({
            dest: dest.css
        }))
        .pipe(gulp.dest(dest.css));
});

gulp.task('devCSS', function() {
    return devCSS = gulp.src(src.css)
        .pipe(postcss(plugins))
        .pipe(gulp.dest(dest.css));
});

gulp.task('criticalCSS', function () {
    return gulp.src('layouts/critical.html')
        .pipe(critical({
            base: 'layouts/partials/',
            dest: 'head.html',
            inline: true, 
            css: ['static/assets/styles/styles.css']}
        ))
        .on('error', function(err) { 
            log.error(err.message); 
        });
});

gulp.task('default', ['devCSS']);

gulp.task('build', ['buildCSS', 'criticalCSS']);

gulp.task('vendor', ['vendorCSS', 'vendorJS']);

gulp.task('watch', function() {
    css = (env === 'production') ? ['buildCSS'] : ['devCSS'];
    var watcher = gulp.watch([src.css], css);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
