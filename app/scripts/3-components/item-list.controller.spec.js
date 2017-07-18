'use strict';

describe('Component: itemList', function () {

    var bindings;
    var component;
    var $componentController;
    var $scope;

    beforeEach(function () {
        module('inventory');
        module('templates');

        inject(function ($rootScope, _$componentController_) {
            bindings = {};
            $scope = $rootScope.$new();
            $componentController = _$componentController_;
        });
    });

    // Specs here

    it('should return a property value', function () {
        component = $componentController('itemList', {
            $scope: $scope
        }, bindings);
        expect(component.foo).toBe('bar');
    });

    it('should return a method value', function () {
        component = $componentController('itemList', {
            $scope: $scope
        }, bindings);
        expect(component.baz()).toBe('qux');
    });
});
