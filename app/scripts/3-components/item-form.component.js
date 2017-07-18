(function() {
    'use strict';

    angular
        .module('inventory')
        .component('itemForm', {
            controller: itemFormCtrl,
            controllerAs: 'vm',
            templateUrl: 'scripts/3-components/item-form.template.html',
            bindings: {
                'onCreate': '&',
            }
        });

    function itemFormCtrl() {
        var vm = this;  // jshint ignore:line

        vm.itemName = '';
        vm.submit = submit;

        function submit() {
            // Crea siempre un item con cantidad 0
            vm.onCreate({ name: vm.itemName, total: 0 });
            vm.itemName = '';
        }
    }
})();
