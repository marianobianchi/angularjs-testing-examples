(function() {
    'use strict';

    angular
        .module('inventory2')
        .component('inventory2', {
            controller: inventory,
            controllerAs: 'vm',
            templateUrl: 'scripts/3-components-rev2/inventory.template.html',
        });

    inventory.$inject = ['Item2API', 'Inventory'];

    function inventory(Item2API, Inventory) {
        var vm = this; // jshint ignore:line
        vm.$onInit = onInit;

        function onInit() {
            Item2API.all(function(results) {
                Inventory.initialize(results);
            });
        }
    }
})();
