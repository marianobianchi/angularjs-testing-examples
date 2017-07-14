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
        var vm = this;

        vm.remove = remove;
        vm.update = update;

        function remove(i) {
            vm.onDelete({ idx: i });
        }

        function update(i, t) {
            vm.onEdit({ idx: i, total: t });
        }
    }
})();
