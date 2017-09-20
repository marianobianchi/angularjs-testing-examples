'use strict';

describe('Component: transform', function () {
    var component;
    var bindings;
    var $scope;
    var $componentController;
    var uppercaseService;
    var mockResult = 'MOCKED';

    beforeEach(function () {
        module('transform');

        module(function ($provide) {
            // Mock del uppercaseService
            $provide.service('uppercaseService', function () {
                this.process = jasmine.createSpy().and.returnValue(mockResult);
            });
        });

        inject(function ($rootScope, _$componentController_, _uppercaseService_) {
            bindings = {};
            $scope = $rootScope.$new();
            $componentController = _$componentController_;
            uppercaseService = _uppercaseService_;
        });
    });

    describe('controller', function() {
        beforeEach(function() {
            component = $componentController('transform', {
                $scope: $scope
            }, bindings);
        });

        it('should initialize correctly', function () {
            expect(component.textoDeEntrada).toBe('');
            expect(component.textoTransformado).toBe('');
        });

        it('transformarTexto should call uppercaseService.process', function() {
            component.textoDeEntrada = 'Probando';
            component.transformarTexto();
            expect(component.textoTransformado).toBe(mockResult);
            expect(uppercaseService.process).toHaveBeenCalledWith(component.textoDeEntrada);
        });
    });
});
