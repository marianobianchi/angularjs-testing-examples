(function() {
    'use strict';

    angular
        .module('inventory')
        .factory('Item', ItemService);

    ItemService.$inject = ['$resource'];

    function ItemService($resource) {
        return $resource('/items.json', {}, {
            all: {
                method: 'GET',
                isArray: true,
            }
        });
    }
})();
