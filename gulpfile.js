var postcss = require('gulp-postcss');
var precss = require('precss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var rev = require('gulp-rev');
var revDel = require('rev-del');
var fs = require('fs'),
    path = require('path');

var dirString = path.dirname(fs.realpathSync(__filename));

var src = {
    css: dirString + '/src/css/*.css',
    js: dirString + '/src/js/*.js'
}

var dest = {
    css: dirString + '/static/css/',
    js: dirString + '/static/js/'
}

var env;
env = process.env.NODE_ENV || 'development';

console.log('css src path is: ', src.css)
console.log('js src path is: ', src.js);
console.log('css dest path is: ', dest.css)
console.log('js dest path is: ', dest.js);

var plugins = [
    precss(),
    autoprefixer({browsers: ['last 1 version']}),
    cssnano()
];

gulp.task('buildCSS', function() {
    return gulp.src(src.css)
    .pipe(postcss(plugins))
    .pipe(rev())
    .pipe(gulp.dest(dest.css))
    .pipe(rev.manifest())
    .pipe(revDel({ dest: dest.css }))
    .pipe(gulp.dest(dest.css));
});

gulp.task('devCSS', function() {
    return devCSS = gulp.src(src.css)
    .pipe(postcss(plugins))
    .pipe(gulp.dest(dest.css));
});

gulp.task('default', ['css']);

gulp.task('watch', function() {
    css   =  ( env === 'production' ) ? ['buildCSS'] : ['devCSS'];
    var watcher = gulp.watch([src.css], css);
    watcher.on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});