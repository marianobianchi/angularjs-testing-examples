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
            /*
                Pasa a mayúscula la primer letra de cada palabra
                Ej: process("hola mundo!") == "Hola Mundo!"
            */
            var words = text.split(' ');
            var upperCaseWords = words.map(function(w) {
                return w[0].toUpperCase() + w.slice(1);
            });
            // TODO: dejar esto
            // var upperCaseWords = words.map(function(w) {
            //     return w ? w[0].toUpperCase() + w.slice(1) : '';
            // });

            return upperCaseWords.join(' ');
        }
    }
})();
