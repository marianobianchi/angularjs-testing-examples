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
            template: '<ui-view/>',
            abstract: true,
        };

        var transform = {
            name: 'main.transform',
            url: '/transform',
            component: 'transform',
        };

        $stateProvider
            .state(rootState)
            .state(transform);
    }
})();
