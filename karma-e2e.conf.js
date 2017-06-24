// An example configuration file.
'use strict';

/* global browser:true */
var config = require('./tasks/config');

exports.config = {
    baseUrl: config.e2eBaseUrl,

    // The address of a running selenium server.
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    // seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['tests/e2e/**/*.js'],

    capabilities: {
        'browserName': 'firefox',
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true
    },

    onPrepare: function() {
        browser.manage()
            .window()
            .setSize(1360, 768);
        browser.manage()
            .timeouts()
            .setScriptTimeout(20000);
    }
};
