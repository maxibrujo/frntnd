const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const bemVal = require('gulp-html-bem-validator');
const htmlVal = require('gulp-w3c-html-validator');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const del = require('del');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles1', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({suffix: '', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie11'}))
        .pipe(gulp.dest("dist/css"));
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        //.pipe(rename("style.min.css"))
        //
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie11'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(posthtml([
            include()
        ]))
        .pipe(htmlVal())
        .pipe(bemVal())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

// gulp.task('icons', function () {
//     return gulp.src("src/icons/**/*")
//         .pipe(gulp.dest("dist/icons"));
// });

// gulp.task('mailer', function () {
//     return gulp.src("src/mailer/**/*")
//         .pipe(gulp.dest("dist/mailer"));
// });

gulp.task('images', function () {
    return gulp.src("src/img/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("dist/img"));
});

gulp.task('webp',function(){
    return gulp.src("dist/img/*.{png,jpg}")
    .pipe(webp({quality:90}))
    .pipe(gulp.dest("dist/img"));
});

gulp.task('pictures', gulp.series('images', 'webp'));

gulp.task('sprite',function(){
    return gulp.src("src/img/**/icon-*.svg")
    .pipe(svgstore({inlineSvg:true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("dist/img"));
});

gulp.task('clean',function() {
    return del('build');
});

gulp.task('short', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'html'));

gulp.task('default', gulp.series(gulp.task('clean'), gulp.task('sprite'), gulp.parallel('watch', 'server', 'styles1', 'styles', 'scripts', 'fonts', 'html', 'pictures')));