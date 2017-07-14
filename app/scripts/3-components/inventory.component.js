(function() {
    'use strict';

    angular
        .module('inventory')
        .component('itemList', {
            controller: itemList,
            controllerAs: 'vm',
            templateUrl: 'scripts/3-components/inventory.template.html',
        });

    itemList.$inject = ['Item'];

    function itemList(Item) {
        var vm = this;

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
