(function() {
    'use strict';

    angular
        .module('inventory2')
        .service('Inventory', InventoryService);

    InventoryService.$inject = [];

    function InventoryService() {
        var internalItems = [];

        this.initialize = initialize;
        this.items = items;
        this.add = add;
        this.remove = remove;
        this.updateItemCount = updateItemCount;

        function initialize(values) {
            if (!values) {
                values = [];
            }

            internalItems = values;
        }

        function items() {
            /* returns a copy of internalItems */
            return internalItems.slice();
        }

        function add(item) {
            return internalItems.push(item);
        }

        function remove(name) {
            internalItems = internalItems.filter(function(item) {
                return item.name !== name;
            });
        }

        function updateItemCount(name, total) {
            internalItems = internalItems.map(function(item) {
                if (item.name === name) {
                    return { name: item.name, total: total };
                }
                return item;
            });
        }
    }
})();
