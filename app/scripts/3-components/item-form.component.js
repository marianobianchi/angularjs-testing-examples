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

    /*
        Este componente recibe una función onCreate que espera un objeto con
        claves name y total.

        Tiene un input bindeado a la propiedad itemName. Al hacer submit, debe
        llamar al método onCreate.
    */

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
