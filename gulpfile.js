const postcss = require('gulp-postcss');
const precss = require('precss');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rev = require('gulp-rev');
const revDel = require('rev-del');
const revReplace = require('gulp-rev-replace');
const fs = require('fs');
const path = require('path');
const log = require('fancy-log');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const replace = require('gulp-replace');
const dirString = path.dirname(fs.realpathSync(__filename));
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const src = {
    path: dirString + '/src/styles/',
    scss: dirString + '/src/styles/*.scss',
    css: dirString + '/src/styles/*.css',
    js: dirString + '/src/scripts/*.js',
    vendorCSS: dirString + '/src/vendor/*.css',
    vendorJS: dirString + '/src/vendor/*.js',
}

const dest = {
    css: dirString + '/static/assets/styles/',
    js: dirString + '/static/assets/scripts/',
    vendor: dirString + '/static/assets/vendor/',
}

const html = {
    head: dirString + '/layouts/partials/head.links.html',
    footer: dirString + '/layouts/partials/footer.html',
}

log('css src path is: ', src.css)
log('js src path is: ', src.js);
log('css dest path is: ', dest.css)
log('js dest path is: ', dest.js);

const plugins = [
    precss(),
    autoprefixer(),
    cssnano()
];

const vendorCSS = () => {
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
};

const vendorJS = () => {
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
};

const mainJs = () => {
    return gulp.src(src.js)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(dest.js))
        .pipe(rev.manifest(`${dest.js}rev-manifest.json`, {
            base: dest.js,
            merge: true
        }))
        .pipe(revDel({
            dest: dest.js
        }))
        .pipe(gulp.dest(dest.js));
};

const revFooter = () => {
    const manifest = gulp.src( dest.vendor + "rev-manifest.json");
   
    return gulp.src(html.footer, { base: html.footer })
      .pipe(revReplace({ manifest: manifest }))
      .pipe(gulp.dest( html.footer ));
};

const revHead = () => {
    const manifest = gulp.src( dest.vendor + "rev-manifest.json");
   
    return gulp.src(html.head, { base: html.head })
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest( html.head ));
};


// const buildCSS = () => {
//     return gulp.src(src.css)
//         .pipe(postcss(plugins))
//         .pipe(rev())
//         .pipe(gulp.dest(dest.css))
//         .pipe(rev.manifest(`${dest.css}rev-manifest.json`, {
//             base: dest.css,
//         }))
//         .pipe(revDel({
//             dest: dest.css
//         }))
//         .pipe(gulp.dest(dest.css));
// };

// const revCriticalCSS = () => {
//     const manifest = gulp.src( dest.css + "rev-manifest.json");

//     return gulp.src(html.head, { base: html.head })
//       .pipe(revReplace({ manifest: manifest }))
//       .pipe(gulp.dest( html.head ));
// };

const criticalCSS = () => {
    return gulp.src(src.css)
    .pipe(postcss(plugins))
    .pipe(replace(/(^)/g, '<style>\n$1'))
    .pipe(replace(/($)/g, '\n</style>$1'))
    .pipe(rename({
        basename: "head.critical",
        extname: ".html"
    }))
    .pipe(gulp.dest('layouts/partials/'));
};

const devCSS = () => {
    return gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(dest.css));
};

const watch = ()  => {
    const watcher = gulp.watch(src.js, mainJs)
                    gulp.watch([src.scss, src.css], gulp.series([devCSS]));
    watcher.on('change', (event) => {
        log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
};

gulp.task('default', gulp.series([ devCSS ]));

gulp.task('watch', watch);

gulp.task('build', gulp.series([ criticalCSS ]));

gulp.task('vendor', gulp.series([ mainJs, vendorCSS, vendorJS, revHead, revFooter ]));
