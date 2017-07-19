(function() {
    'use strict';

    angular
        .module('inventory')
        .component('inventory', {
            controller: inventory,
            controllerAs: 'vm',
            templateUrl: 'scripts/3-components/inventory.template.html',
        });

    inventory.$inject = ['Item'];

    function inventory(Item) {
        var vm = this; // jshint ignore:line

        vm.addItem = addItem;
        vm.removeItem = removeItem;
        vm.updateItemCount = updateItemCount;
        vm.$onInit = onInit;

        vm.items = [];

        function onInit() {
            Item.all(function(results) {
                vm.items = results;
            });
        }

        function addItem(name, total) {
            // TODO: Uso concat para que cambie el id del array.
            // Si usara un servicio desde backend solo debería llamar al post
            // y al all otra vez
            vm.items = vm.items.concat([{ name: name, total: total }]);
        }

        function removeItem(index) {
            vm.items.splice(index, 1);
        }

        function updateItemCount(index, total) {
            // Ejemplo de uso
            vm.items[index].total = total;
        }
    }
})();
