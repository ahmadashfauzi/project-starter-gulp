var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    rename = require("gulp-rename"),
    wait = require("gulp-wait"),
    browserSync = require("browser-sync").create();

var paths = {
    styles: {
        watchStyle: "styles/**/*.sass",
        src: "styles/style.sass",
        dest: "styles"
    },
    htmls: {
        src: "*.html"
    }
};
// 
function style() {
    return (
        gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
        .pipe(wait(1500))
    );
}

function html() {
    return (
        gulp
        .src(paths.htmls.src)
        .pipe(browserSync.stream())
    );
}

exports.html = html;

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(paths.styles.watchStyle, style);
    gulp.watch(paths.htmls.src, html);
}

exports.watch = watch