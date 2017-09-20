'use strict';

describe('Service: uppercaseService', function () {
    var uppercaseService;

    beforeEach(function () {
        module('uppercase');

        inject(function (_uppercaseService_) {
            uppercaseService = _uppercaseService_;
        });
    });

    it('should uppercase a single word', function () {
        expect(uppercaseService.process('hello')).toBe('Hello');
    });

    it('should uppercase all words in a sentence', function () {
        expect(uppercaseService.process('hello world!')).toBe('Hello World!');
    });

    it('should not change if words are already in uppercase', function () {
        var a = 'Hello World!';
        expect(uppercaseService.process(a)).toBe(a);
    });

    // it('should admit random spaces', function () {
    //     expect(uppercaseService.process(' hello     world   !   ')).toBe(' Hello     World   !   ');
    // });
});
