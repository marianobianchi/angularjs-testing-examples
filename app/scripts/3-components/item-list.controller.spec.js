'use strict';

function sortByNameAndCopy(items) {
    return items.slice().sort(function(firstItem, secondItem) {
        return firstItem.name < secondItem.name ? -1 : 1;
    });
}

describe('Component: itemList', function () {
    var bindings;
    var component;
    var items;
    var onDeleteSpy;
    var onEditSpy;
    var sortedItems;
    var $componentController;
    var $scope;

    beforeEach(function () {
        module('inventory');
        // Seteo el path base donde están los mocks
        fixture.setBase('tests/mocks');

        inject(function ($rootScope, _$componentController_) {
            bindings = {};
            $scope = $rootScope.$new();
            $componentController = _$componentController_;
        });
    });

    beforeEach(function() {
        // Traigo los items desde un fixture
        items = fixture.load('items.json');
        onDeleteSpy = jasmine.createSpy('onDelete');
        onEditSpy = jasmine.createSpy('onEdit');

        // Me guardo una copia de los items ordenados por nombre
        sortedItems = sortByNameAndCopy(items);

        bindings = {
            items: items,
            onDelete: onDeleteSpy,
            onEdit: onEditSpy,
        };

        component = $componentController('itemList', {
            $scope: $scope
        }, bindings);
    });

    // Specs here
    it('should define sortedItems', function () {
        expect(component.sortedItems).toEqual([]);
    });

    it('should sort items onInit', function () {
        component.$onInit();
        expect(component.sortedItems).toEqual(sortedItems);
    });

    it('should sort items by name', function () {
        expect(component.sortItems(items)).toEqual(sortedItems);
    });

    it('should sort items if binding changes', function () {
        var changeObj = { items: { currentValue: items } };
        // Simulate binding changes
        component.$onChanges(changeObj);
        expect(component.sortedItems).toEqual(sortedItems);
    });

    it('should call onDelete when removing', function() {
        component.remove(1);
        expect(onDeleteSpy).toHaveBeenCalledWith({ idx: 1 });
    });

    it('should call onEdit when updating', function() {
        component.update(1, 5);
        expect(onEditSpy).toHaveBeenCalledWith({ idx: 1, total: 5 });
    });
});
