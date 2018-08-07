(function() {
    'use strict';

    angular
        .module('inventory2')
        .factory('Item2API', Item2Api);

    Item2Api.$inject = ['$resource'];

    function Item2Api($resource) {
        return $resource('/items.json', {}, {
            all: {
                method: 'GET',
                isArray: true,
            }
        });
    }
})();
