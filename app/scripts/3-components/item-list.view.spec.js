'use strict';

describe('Directive: item-list', function () {
    var element;
    var isolatedScope;
    var items;
    var template;
    var $compile;
    var $scope;

    beforeEach(function () {
        module('inventory');
        module('templates');
        fixture.setBase('tests/mocks');

        inject(function ($rootScope, _$compile_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
        });
    });

    beforeEach(function () {
        // Traigo los items desde un fixture
        items = fixture.load('items.json');
        $scope.items = items;
        template = '<item-list items="items"></item-list>';
        element = $compile(template)($scope);
        $scope.$apply();
        isolatedScope = element.isolateScope();
    });

    // Specs here

    it('should call remove when clicking on trash button', function () {
        isolatedScope.vm.remove = jasmine.createSpy('remove');
        element.find('button[name=itemRemove]')
               .eq(0)
               .triggerHandler('click');

        expect(isolatedScope.vm.remove).toHaveBeenCalledWith(0);
    });

    it('should call update when clicking changing total', function () {
        isolatedScope.vm.update = jasmine.createSpy('update');
        element.find('input[name=itemTotal]')
               .eq(0)
               .val(10)
               .triggerHandler('change');
        expect(isolatedScope.vm.update).toHaveBeenCalledWith(0, 10);
    });

    // Ejemplo de como testear onChanges desde afuera
    it('should call vm.sortItems if items change', function() {
        isolatedScope.vm.sortItems = jasmine.createSpy('sortItems');
        $scope.items = items.concat([{ name: 'new item', total: 0 }]);
        expect(isolatedScope.vm.sortItems).not.toHaveBeenCalled();
        $scope.$apply();
        expect(isolatedScope.vm.sortItems).toHaveBeenCalled();
    });
});
