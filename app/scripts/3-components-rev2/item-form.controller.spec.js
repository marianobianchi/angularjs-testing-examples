'use strict';

describe('module inventory2', function () {
    describe('Component: itemForm', function () {
        var component;
        var bindings;
        var onCreateSpy;
        var $scope;
        var $componentController;

        beforeEach(function () {
            module('inventor2y');

            onCreateSpy = jasmine.createSpy('onCreate');
            bindings = {
                onCreate: onCreateSpy,
            };

            inject(function ($rootScope, _$componentController_) {
                $scope = $rootScope.$new();
                $componentController = _$componentController_;

                component = $componentController('itemForm2', {
                    $scope: $scope
                }, bindings);
            });
        });

        // Specs here
        it('should start correctly', function () {
            expect(component.itemName).toBe('');
            expect(component.submit).toBeDefined();
        });

        it('should call onCreate correctly when submitting', function () {
            var value = 'cartas';
            component.itemName = value;
            component.submit();
            expect(onCreateSpy).toHaveBeenCalledWith({ name: value, total: 0 });
        });

        it('should clean itemName when submitting', function () {
            component.itemName = 'cartas';
            component.submit();
            expect(component.itemName).toBe('');
        });
    });
});
