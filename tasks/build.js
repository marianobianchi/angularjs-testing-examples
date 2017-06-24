var config = require('./config');
var gulp = require('gulp');

/**
 * Build-Task Files
 *
 * NOTE: Depends on sme of the dev-tasks as well
 */


var del = require('del');
var gulpif = require('gulp-if');
var minifyHtml = require('gulp-minify-html');
var cleanCSS = require('gulp-clean-css');
var useref = require('gulp-useref');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence')
    .use(gulp);
var wiredep = require('wiredep').stream;

var merge = require('merge-stream');
var lazypipe = require('lazypipe');


// main task
gulp.task('build', function(callback) {
    runSequence(
        'cleanDist',
        'wiredepBuild',
        'injectAll',
        // 'testSingle',
        // 'lint',
        'sass',
        'minFiles',
        'copy',
        // reset config
        //'ngConfig',
        callback);
});

gulp.task('wiredepBuild', function() {
    return gulp.src([config.karmaConf, config.mainFile], { base: './' })
        .pipe(wiredep({
            exclude: [
                // TODO inject excluded
            ],
            devDependencies: false
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('cleanDist', function() {
    return del.sync(config.dist);
});


gulp.task('copy', function() {
    var html = gulp.src(config.htmlF, { base: config.base })
                   .pipe(minifyHtml({
                       conditionals: true,
                       loose: true,
                       empty: true,
                       quotes: true
                   }))
                   .pipe(gulp.dest(config.dist));

    var fonts = gulp.src(config.fontsF)
                    .pipe(gulp.dest(config.dist + '/styles/fonts/'));

    // FIXME: imagemin tira un error
    var images = gulp.src(config.imagesF, { base: config.base })
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{ removeViewBox: false }]
        // }))
        .pipe(gulp.dest(config.dist));

    return merge(html, fonts, images);
});


gulp.task('minFiles', function() {
    return gulp.src(config.mainFile)
        .pipe(useref({}, lazypipe()
            .pipe(sourcemaps.init, { loadMaps: true }))
        )
        .pipe(gulpif('*.js', ngAnnotate()))
        .pipe(gulpif('*.js', uglify({ preserveComments: 'license', compress: true })))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulpif('*.js', rev()))
        .pipe(gulpif('*.css', rev()))
        .pipe(revReplace())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dist));
});
