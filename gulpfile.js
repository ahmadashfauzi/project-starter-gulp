var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();

var paths = {
    styles: {
        src: "styles/**/*.sass",
        dest: "styles"
    },
    htmls: {
        src: "*.html"
    }
};

function style() {
    return (
        gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
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
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.htmls.src, html);
}

exports.watch = watch