/**
 * @ngdoc overview
 * @name routes
 * @description
 * # routes
 *
 * Routes module. All app states are defined here.
 */

(function() {
    'use strict';

    angular
        .module('main')
        .config(routerHelperProvider);

    routerHelperProvider.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerHelperProvider($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        var rootState = {
            name: 'main',
            url: '/',
        };

        var transform = {
            name: 'main.transform',
            url: 'transform',
            component: 'transform',
        };

        var inventory = {
            name: 'main.inventory',
            url: 'inventory',
            component: 'itemList',
        };

        $stateProvider
            .state(rootState)
            .state(transform)
            .state(inventory)
            /* trailing semi-colon */;
    }
})();
