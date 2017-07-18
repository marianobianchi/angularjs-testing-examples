(function() {
    'use strict';

    angular
        .module('inventory')
        .component('itemList', {
            controller: itemCtrl,
            controllerAs: 'vm',
            templateUrl: 'scripts/3-components/item-list.template.html',
            bindings: {
                'items': '<',
                'onEdit': '&',
                'onDelete': '&',
            }
        });

    function itemCtrl() {
        var vm = this; // jshint ignore:line

        vm.sortedItems = [];

        vm.remove = remove;
        vm.update = update;
        vm.sortItems = sortItems;
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;

        function remove(i) {
            // El indice funciona porque el sort es inplace
            vm.onDelete({ idx: i });
        }

        function update(i, t) {
            // El indice funciona porque el sort es inplace
            vm.onEdit({ idx: i, total: t });
        }

        function sortItems(items) {
            return items.sort(function(firstItem, secondItem) {
                return firstItem.name < secondItem.name ? -1 : 1;
            });
        }

        function onInit() {
            vm.sortedItems = vm.sortItems(vm.items);
        }

        function onChanges(changeObj) {
            if (changeObj.items) {
                vm.sortedItems = vm.sortItems(changeObj.items.currentValue);
            }
        }
    }
})();
