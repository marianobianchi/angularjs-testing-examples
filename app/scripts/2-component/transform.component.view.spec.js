'use strict';

describe('Component: transform', function () {

    var template;
    var element;
    var $scope;
    var $compile;
    var uppercaseService;

    beforeEach(function () {
        module('templates');
        module('transform');

        module(function ($provide) {
            $provide.factory('uppercaseService', function () {
                return {
                    process: jasmine.createSpy('uppercaseService.process'),
                };
            });
        });

        inject(function ($rootScope, _$compile_, _uppercaseService_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            uppercaseService = _uppercaseService_;
        });
    });

    describe('view', function() {
        beforeEach(function() {
            template = '<transform></transform>';
            element = $compile(template)($scope);
            $scope.$apply();
        });

        it('should show bold message', function () {
            // Solo de ejemplo
            expect(element.find('b').text()).toBe('El texto transformado es:');
        });

        it('should call transformarTexto on change', function () {
            var inputValue = 'hola';
            var result = 'Hola';
            uppercaseService.process.and.returnValue(result);

            var isolatedScope = element.isolateScope();
            // Creo un spy para chequear que se llame al metodo correcto
            // (y dejo que llame al metodo original)
            spyOn(isolatedScope.vm, 'transformarTexto').and.callThrough();

            element.find('input').eq(0).val(inputValue).triggerHandler('change');

            expect(isolatedScope.vm.transformarTexto).toHaveBeenCalled();
            expect(isolatedScope.vm.textoDeEntrada).toBe(inputValue);
            expect(isolatedScope.vm.textoTransformado).toBe(result);

            expect(element.find('div').eq(2).text().trim()).toBe('El texto transformado es: Hola');
        });
    });
});
