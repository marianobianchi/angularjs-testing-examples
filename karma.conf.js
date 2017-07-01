// Karma configuration
'use strict';

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'wiredep',
            'jasmine',
            'fixture',
        ],

        // list of files / patterns to load in the browser
        files: [
            // Only bower_component file excluded from wiredep (only in devDependencies)
            'app/bower_components/angular-mocks/angular-mocks.js',

            // modules first
            'app/scripts/**/*.module.js',
            // all the rest of the files
            'app/scripts/**/*.js',
            // load html as well as required for karma-ng-html2js-preprocessor
            'app/scripts/**/*.html',

            // JSON fixture
            'tests/mocks/**/*.json',
        ],

        // list of files to exclude
        exclude: [],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
        // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        plugins: [
            'karma-jasmine',
            'karma-fixture',
            'karma-coverage',
            'karma-wiredep',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-ng-html2js-preprocessor',
            'karma-jasmine-html-reporter',
            'karma-json-fixtures-preprocessor',
        ],

        // reporters configuration
        reporters: [
            'mocha',
            'coverage',
            'kjhtml',
        ],

        preprocessors: {
            '**/app/scripts/**/!(*spec).js': 'coverage',
            '**/app/scripts/**/*.html': 'ng-html2js',
            '**/*.json': 'json_fixtures',
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'templates',
            stripPrefix: 'app/'
        },

        jsonFixturesPreprocessor: {
            variableName: '__json__'
        },

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
    });
};
