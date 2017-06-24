(function() {
    'use strict';

    angular.module('uppercase')
           .factory('uppercaseService', uppercaseService);

    function uppercaseService() {
        var service = {
            process: process,
        };

        return service;

        function process(text) {
            var words = text.split(' ');
            var upperCaseWords = words.map(function(w) {
                return w[0].toUpperCase() + w.slice(1);
            });

            return upperCaseWords.join(' ');
        }
    }
})();
