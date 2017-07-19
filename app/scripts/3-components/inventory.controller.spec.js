'use strict';

describe('Component: inventory', function () {
    var bindings;
    var component;
    var httpExpect;
    var $componentController;
    var $httpBackend;
    var $scope;

    beforeEach(function () {
        module('inventory');
        module('templates');

        // En vez de mockear el servicio, voy a mockear el backend
        // module(function ($provide) {
        // 	$provide.factory('Item', function () {});
        // });

        inject(function ($rootScope, _$componentController_, _$httpBackend_) {
            bindings = {};
            $scope = $rootScope.$new();
            $componentController = _$componentController_;
            $httpBackend = _$httpBackend_;
        });
    });

    beforeEach(function() {
        component = $componentController('inventory', {
            $scope: $scope
        }, bindings);

        httpExpect = $httpBackend.expectGET('/items.json');
    });

    // Specs here
    it('should set items if backend works correctly', function () {
        httpExpect.respond([1, 2, 3]);
        component.$onInit();
        expect(component.items).toEqual([]);
        $httpBackend.flush();
        expect(angular.equals(component.items, [1, 2, 3])).toBeTruthy();
    });

    // it('should let items empty if backend respond with errors', function () {
    //     httpExpect.respond(500, { status: 500, detail: 'Esto es un error' });
    //     component.$onInit();
    //     expect(component.items).toEqual([]);
    //     $httpBackend.flush();
    //     expect(component.items).toEqual([]);
    // });
});
