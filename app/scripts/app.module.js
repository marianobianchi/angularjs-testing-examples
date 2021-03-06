/**
 * @ngdoc overview
 * @name angularjs-testing-example
 * @description
 * # angularjs-testing-example
 *
 * Main module of the application.
 */

(function () {
    'use strict';

    angular
        .module('main', [
            'ui.router',

            // App modules
            'uppercase',
            'transform',
            'inventory',
            'inventory2',
        ]);
})();
