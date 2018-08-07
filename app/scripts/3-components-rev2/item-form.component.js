(function() {
    'use strict';

    angular
        .module('inventory2')
        .component('itemForm2', {
            controller: itemFormCtrl,
            controllerAs: 'vm',
            templateUrl: 'scripts/3-components-rev2/item-form.template.html',
        });

    /*
        Este componente recibe una función onCreate que espera un objeto con
        claves name y total.

        Tiene un input bindeado a la propiedad itemName. Al hacer submit, debe
        llamar al método onCreate.
    */

    itemFormCtrl.$inject = ['Inventory'];

    function itemFormCtrl(Inventory) {
        var vm = this;  // jshint ignore:line

        vm.itemName = '';
        vm.submit = submit;

        function submit() {
            // Crea siempre un item con cantidad 0
            Inventory.add({ name: vm.itemName, total: 0 });
            vm.itemName = '';
        }
    }
})();
