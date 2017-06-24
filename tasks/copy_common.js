'use strict';

var gulp = require('gulp');


gulp.task('copyModules', function() {
    var sourcesDirs = [
        '../common/app/scripts/services/{perfil-usuario,user-utils,data-persister,modulos}/*.js',
        '../common/app/scripts/components/{menu,!}/*',
    ];

    var destDir = 'app/scripts/';

    return gulp.src(sourcesDirs)
               .pipe(gulp.dest(destDir));
});

gulp.task('copyStyles', function() {
    return gulp.src('../common/app/styles/{fonts,gcba}/*')
               .pipe(gulp.dest('app/styles/'));
});

gulp.task('copyImages', function() {
    return gulp.src('../common/app/{images,!}/*')
               .pipe(gulp.dest('app/'));
});

gulp.task('copyCommon', ['copyModules', 'copyStyles', 'copyImages']);
