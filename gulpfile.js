// @ts-check

const browserSync = require('browser-sync');
const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');

const server = browserSync.create();

const paths = {
    scripts: {
        src: 'src/app/'
    }
};

function reload(done) {
    console.log("15");

    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: 'public',
            index: 'index.html'
        }
    });
    done();
}

function pug2html(cb) {
    return gulp.src('src/app/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('public'));
}

function less2css(cb) {
    return gulp.src('src/app/*.less')
        .pipe(less())
        .pipe(gulp.dest('public'));
}

const watch = () => gulp.watch(paths.scripts.src, gulp.series(pug2html, less2css, reload));

const dev = gulp.series(pug2html, less2css, serve, watch);

gulp.task('dev', dev);