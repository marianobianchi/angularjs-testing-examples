'use strict';
/* jshint camelcase: false */

var path = require('path');
var config = require('./config');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var print = require('gulp-print');

/**
 * Dev Task File
 *
 */

var sass = require('gulp-sass').sync;
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var wiredep = require('wiredep').stream;
var inj = require('gulp-inject');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var watch = require('gulp-watch');
var runSequence = require('run-sequence')
    .use(gulp);

var jshint = require('gulp-jshint');
var eslint = require('gulp-eslint');
var KarmaServer = require('karma').Server;
var plumber = require('gulp-plumber');

function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint != null && file.eslint.fixed;
}

// main task
gulp.task('default', function(cb) {
    runSequence(
        'copyCommon',
        'wiredep',
        'lint',
        // 'beautify',
        'injectAll',
        'fonts',
        'buildStyles',
        'browserSync',
        'watch',
        function() {
            // run in parallel but afterwards
            gulp.start('test');
            cb();
        }
    );
});
gulp.task('serve', ['default']);
gulp.task('server', ['default']);


gulp.task('injectAll', function(callback) {
    runSequence(
        'wiredep',
        'injectScripts',
        'injectStyles',
        // 'beautify',
        callback
    );
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
               .pipe(gulp.dest(config.styles + 'fonts'));
});


gulp.task('watch', function(cb) {
    watch(config.stylesF, function() {
        gulp.start('buildStyles')
            .on('end', cb);
    });
    watch(config.scriptsF, function() {
        gulp.start('injectScripts')
            .on('end', cb);
    });
    watch(config.scriptsAllF, function() {
        gulp.start('lint')
            .on('end', cb);
    });
    watch(config.allHtmlF, function() {
        gulp.start('html')
            .on('end', cb);
    });

    //gulp.watch('bower.json', ['wiredep']);

    // enable at your convenience
    //watch(config.scripts + '*.json', function() {
    //    gulp.start('ngConfig')
    //        .on('end', cb);
    //});
});


gulp.task('buildStyles', function(cb) {
    runSequence(
        'injectStyles',
        'sass',
        cb
    );
});


gulp.task('injectStyles', function() {
    var sources = gulp.src(config.stylesF, { read: false });
    var target = gulp.src(config.mainSassFile);
    var outputFolder = gulp.dest(config.styles);

    return target
        .pipe(inj(sources,
            {
                starttag: '// inject:sass',
                endtag: '// endinject',
                ignorePath: [config.base.replace('./', ''), 'styles'],
                relative: true,
                addRootSlash: false,
                transform: function (filepath) {
                    if (filepath) {
                        return '@import  \'' + filepath + '\';';
                    }
                }
            }
        ))
        .pipe(outputFolder);
});


gulp.task('injectScripts', function() {
    var sources = gulp.src(config.scriptsF, { read: true });
    // .pipe(sort()); // Funciona solo si las definiciones de modulos arrancan con _
    var target = gulp.src(config.mainFile);
    return target
        .pipe(inj(sources, { ignorePath: config.base.replace('./', ''), addRootSlash: false }
        ))
        .pipe(gulp.dest(config.base));
});


gulp.task('sass', function() {
    var sources = gulp.src(config.mainSassFile);
    var outputFolder = gulp.dest(config.styles);

    return sources
        .pipe(plumber({
            handleError: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        // .pipe(sass({ errLogToConsole: true , includePaths: [config.bootstrapDir + '/assets/stylesheets'],}))
        .pipe(sass({ errLogToConsole: true }))
        .pipe(autoprefixer({
            browsers: ['> 0.1%']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tmp))
        .pipe(outputFolder)
        .pipe(browserSync.stream());
});


gulp.task('browserSync', function() {
    browserSync.init({
        port: config.browserSyncPort,
        server: ['app', 'data'],
        open: false,
    });
});


gulp.task('serve:dist', function() {
    browserSync.init({
        port: config.browserSyncPort,
        server: {
            baseDir: config.dist,
            livereload: false,
        },
        open: false,
    });
});


gulp.task('html', function() {
    return gulp.src(config.allHtmlF)
        .pipe(reload({ stream: true }));
});


gulp.task('wiredep', ['wirdepKarma', 'wiredepIndex']);

gulp.task('wirdepKarma', function() {
    return gulp.src(config.karmaConf, { base: './' })
        .pipe(wiredep({
            devDependencies: true,
            exclude: config.excludedBowerComponents
        }))
        // required as weird workaround for not messing up the files
        .pipe(gulp.dest(config.tmp))
        .pipe(gulp.dest('./'));
});

gulp.task('wiredepIndex', function() {
    return gulp.src(config.mainFile, { base: './' })
        .pipe(wiredep({
            devDependencies: false,
            exclude: config.excludedBowerComponents
        }))
        // required as weird workaround for not messing up the files
        .pipe(gulp.dest(config.tmp))
        .pipe(gulp.dest('./'));
});


gulp.task('test', function(done) {
    new KarmaServer({
        configFile: path.join(__dirname, '/../karma.conf.js'),
        action: 'watch'
    }, done).start();
});


gulp.task('testSingle', function(done) {
    new KarmaServer({
        configFile: path.join(__dirname + '/../karma.conf.js'),
        action: 'run',
        autoWatch: false,
        singleRun: true
    }, done).start();
});


gulp.task('lint', function() {
    return gulp.src([config.scriptsAllF,
                     './karma-e2e.conf.js',
                     './karma.conf.js',
                     './gulpfile.js'], { base: './' })
               .pipe(jshint())
               .pipe(jshint.reporter('jshint-stylish'))
               .pipe(eslint())
               .pipe(eslint.format());
});

// gulp.task('beautify', function() {
//     return gulp.src([config.scriptsAllF,
//                      './karma-e2e.conf.js',
//                      './karma.conf.js',
//                      './gulpfile.js'], { base: './' })
//                .pipe(eslint({ fix: true }))
//                .pipe(eslint.format())
//                .pipe(gulpIf(isFixed, gulp.dest('./')));
// });
