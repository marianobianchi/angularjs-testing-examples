(function() {
    'use strict';

    angular
        .module('uppercase')
        .service('uppercaseService', uppercaseService);

    function uppercaseService() {
        this.process = process;

        function process(text) {
            /* Pasa a mayúscula la primer letra de cada palabra
                Ej: process("hola mundo!") == "Hola Mundo!"  */
            var words = text.split(' ');
            var upperCaseWords = words.map(function(w) {
                return w[0].toUpperCase() + w.slice(1);
            });

            return upperCaseWords.join(' ');
        }
    }
})();
