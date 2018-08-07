'use strict';

describe('module inventory2', function () {
    describe('Directive: item-form', function () {
        var element;
        var inputValue;
        var isolatedScope;
        var submitSpy;
        var template;
        var $scope;
        var $compile;

        beforeEach(function () {
            module('inventory2');
            module('templates');

            inject(function ($rootScope, _$compile_) {
                $scope = $rootScope.$new();
                $compile = _$compile_;
            });

            // Creo spy para on-create
            $scope.onCreateSpy = jasmine.createSpy('onCreateSpy');

            template = '<item-form2 on-create="onCreateSpy"></item-form2>';
            element = $compile(template)($scope);
            inputValue = 'hola';

            // Creo spy para el metodo
            submitSpy = jasmine.createSpy('submit');

            $scope.$apply();

            // Tomo el scope aislado del template
            isolatedScope = element.isolateScope();
        });

        // Specs here
        it('should call the correct method', function () {
            isolatedScope.vm.submit = submitSpy;

            element.find('button#submit')
                   .triggerHandler('click')
                   /**/;

            // Chequeo que se llame al metodo correcto
            expect(isolatedScope.vm.submit).toHaveBeenCalled();
        });

        it('should use the correct model', function () {
            element.find('input#itemName')
                   .val(inputValue)
                   .triggerHandler('change')
                   /**/;

            // Chequeo que esté bien seteado el modelo
            expect(isolatedScope.vm.itemName).toBe(inputValue);
        });
    });
});
