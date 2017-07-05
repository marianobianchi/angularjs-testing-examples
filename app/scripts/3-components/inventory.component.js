(function() {
    'use strict';

    angular
        .module('inventory')
        .component('itemList', {
            controller: itemList,
            controllerAs: 'vm',
            templateUrl: 'scripts/3-components/inventory.template.html',
        });

    function itemList() {
        var vm = this;

        vm.addItem = addItem;
        vm.removeItem = removeItem;
        vm.updateItemCount = updateItemCount;

        vm.items = [
            { name: 'calzoncillo', total: 8 },
            { name: 'remera', total: 4 },
            { name: 'zapatillas', total: 2 },
            { name: 'ojotas', total: 1 },
        ];

        function addItem(name, total) {
            vm.items.push({ name: name, total: total });
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
