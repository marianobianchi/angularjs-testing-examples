(function() {
    'use strict';

    angular
        .module('inventory2')
        .component('itemList2', {
            controller: itemCtrl,
            controllerAs: 'vm',
            templateUrl: 'scripts/3-components-rev2/item-list.template.html',
        });

    itemCtrl.$inject = ['Inventory'];

    function itemCtrl(Inventory) {
        var vm = this; // jshint ignore:line

        vm.remove = remove;
        vm.update = update;
        vm.sortedItems = sortedItems;

        function remove(name) {
            Inventory.remove(name);
        }

        function update(name, total) {
            Inventory.updateItemCount(name, total);
        }

        function sortedItems() {
            var items = Inventory.items();
            return items.sort(function(firstItem, secondItem) {
                return firstItem.name < secondItem.name ? -1 : 1;
            });
        }
    }
})();
