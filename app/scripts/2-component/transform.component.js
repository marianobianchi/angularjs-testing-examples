(function() {
    'use strict';

    angular
        .module('transform')
        .component('transform', {
            controller: TransformController,
            controllerAs: 'vm',
            templateUrl: 'scripts/2-component/transform.template.html',
        });

    TransformController.$inject = ['uppercaseService'];

    function TransformController(uppercaseService) {
        var vm = this;

        vm.textoDeEntrada = '';
        vm.textoTransformado = '';
        vm.transformarTexto = transformarTexto;

        function transformarTexto() {
            vm.textoTransformado = uppercaseService.process(vm.textoDeEntrada);
        }
    }
})();
