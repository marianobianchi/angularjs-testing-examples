(function() {
    'use strict';

    angular
        .module('inventory')
        .component('item', {
            controller: itemCtrl,
            controllerAs: 'vm',
            templateUrl: 'scripts/3-components/item.template.html',
            bindings: {
                'item': '<',
                'onEdit': '&',
                'onDelete': '&',
            }
        });

    function itemCtrl() {
        var vm = this;

        vm.remove = remove;
        vm.update = update;

        function remove() {
            vm.onDelete();
        }

        function update() {
            vm.onEdit({ total: vm.item.total });
        }
    }
})();
