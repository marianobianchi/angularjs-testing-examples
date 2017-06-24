module.exports = (function() {
    'use strict';

    // config vars
    var base = './app';
    var scripts = base + '/scripts';
    var sass = base + '/styles';

    var data = {
        browserSyncPort: 9009,
        cordovaPath: 'cordova',
        defaultPlatform: 'ios',
        excludedBowerComponents: ['es5-shim', 'json3'],
        base: base,
        mainFile: base + '/index.html',
        mainSassFile: sass + '/main.scss',
        routesFiles: base + '/scripts/_routes.js',
        e2eBaseUrl: 'http://localhost/',
        bootstrapDir: base + '/bower_components/bootstrap-sass',
        styles: base + '/styles/',
        stylesF: [
            base + '/styles/**/!(main|_*).{scss,sass,less}',
            scripts + '/**/*.{scss,sass,less}',
        ],
        stylesAllF: [
            base + '/styles/**/*.{scss,sass,less}',
            scripts + '/**/*.{scss,sass,less}'
        ],
        scripts: base + '/scripts/',
        scriptsF: [
            // modules first
            base + '/scripts/**/{_*.js,*.module.js,*.all.js}',
            // All remaining scripts
            base + '/scripts/**/*.js',
            // Avoid test scripts
            '!' + base + '/scripts/**/*.spec.js'
        ],
        scriptsAllF: base + '/scripts/**/*.js',
        scriptTestsF: base + '/scripts/**/*.spec.js',
        html: base + '/scripts/',
        htmlF: [
            base + '/scripts/**/*.html'
        ],
        images: base + '/images/',
        imagesF: base + '/images/**/*.*',
        fonts: base + '/styles/fonts/',
        fontsF: [
            base + '/styles/fonts/**/*.*',
            base + '/bower_components/bootstrap-sass/assets/fonts/**/*.*',
        ],
        tmp: './.tmp',
        dist: 'dist',
        wwwDestination: '',
        karmaConf: './karma.conf.js',
        karmaConfE2E: './karma-e2e.conf.js'
    };

    data.allHtmlF = data.htmlF.slice();
    data.allHtmlF.push(data.mainFile);

    return data;
})();
