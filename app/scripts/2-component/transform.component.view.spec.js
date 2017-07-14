'use strict';

describe('Component: transform', function () {
    var template;
    var element;
    var $scope;
    var $compile;

    beforeEach(function () {
        module('templates');
        module('transform');

        module(function ($provide) {
            $provide.factory('uppercaseService', function () { return {}; });
        });

        inject(function ($rootScope, _$compile_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
        });
    });

    describe('view', function() {
        beforeEach(function() {
            template = '<transform></transform>';
            element = $compile(template)($scope);
            // Evalúa expresiones, dispara los handlers de excepciones y los listeners
            $scope.$apply();
        });

        it('should show bold message', function () {
            // Solo de ejemplo, no tiene sentido testear esto
            // TODO: ver que pasa si agregamos otro b en el template
            expect(element.find('b').text()).toBe('El texto transformado es:');
        });

        it('should call transformarTexto on change', function () {
            var inputValue = 'hola';
            var result = 'Chau';  // como lo mockeamos puede ser cualquier cosa

            // Tomo el scope aislado del template
            var isolatedScope = element.isolateScope();

            // Creo un spy para chequear que se llame al metodo correcto
            isolatedScope.vm.transformarTexto = jasmine.createSpy().and.returnValue(result);

            // busco el input, le seteo un valor de entrada y llamo al trigger de cambio
            // Qué pasa si agregamos otro input? Fallaría este test?
            element.find('input#texto_entrada')
                   .eq(0)
                   .val(inputValue)
                   .triggerHandler('change')
                   /**/;

            // Chequeo que se llame al metodo correcto
            expect(isolatedScope.vm.transformarTexto).toHaveBeenCalled();
            // Chequeo que esté bien seteado el modelo
            expect(isolatedScope.vm.textoDeEntrada).toBe(inputValue);

            // Esto no tiene sentido testearlo y es propenso a errores. Lo dejo a modo de ejemplo
            isolatedScope.vm.textoTransformado = result;
            $scope.$apply();
            var divText = element.find('div')
                                 .eq(2)
                                 .text()
                                 .trim()
                                 /**/;
            expect(divText).toBe('El texto transformado es: Chau');
        });
    });
});
