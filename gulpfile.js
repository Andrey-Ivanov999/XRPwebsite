const gulp = require('gulp');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const include = require('gulp-include');
const imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

const srcBase = 'assets/';
const dstBase = 'static/';

const paths = {
    css: {
        src: `${srcBase}scss/*.scss`,
        dst: `${dstBase}css`
    },
    js: {
        src: `${srcBase}js/*.js`,
        dst: `${dstBase}js`
    },
    img: {
        src: `${srcBase}img/**/*`,
        dst: `${dstBase}img`
    },
    video: {
        src: `${srcBase}video/*`,
        dst: `${dstBase}video`
    },
    vendor: {
        src: `${srcBase}vendor/**/*`,
        dst: `${dstBase}vendor`
    }
}

gulp.task('css', () => {
    return gulp.src(paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({debug: true}, details => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.css.dst))
});

gulp.task('img', () => {
    return gulp.src(paths.img.src)
        .pipe(imagemin([
            imageminJpegtran({progressive: true}),
            imageminPngquant({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false},
                    {removeUselessDefs: false},
                ]
            })
        ]))
        .pipe(gulp.dest(paths.img.dst))
});

gulp.task('js', () => {
    return gulp.src(paths.js.src)
        .pipe(babel({
            plugins: ['@babel/transform-runtime']
        }))
        .pipe(include())
          .on('error', console.log)
        .pipe(sourcemaps.init())
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true,
        }))
        .pipe(gulp.dest(paths.js.dst))
});

gulp.task('vendor', () => {
    return gulp.src(paths.vendor.src)
        .pipe(gulp.dest(paths.vendor.dst))
});

gulp.task('build', gulp.parallel('css', 'img', 'js', 'vendor'));

gulp.task('watch', () => {
    gulp.watch(paths.css.src, gulp.series('css'));
    gulp.watch(paths.js.src, gulp.series('js'));
    gulp.watch(paths.img.src, gulp.series('img'));
    gulp.watch(paths.vendor.src, gulp.series('vendor'));
});

gulp.task('default', gulp.series('build', 'watch'));
