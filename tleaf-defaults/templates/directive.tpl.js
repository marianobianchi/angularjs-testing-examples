{{#if opts.useStrict}}
'use strict';
{{/if}}
describe('Directive: {{name}}', function () {
    var template;
    var element;
    var $scope;
    var $compile;
    var isolatedScope;
    {{#each deps}}
    var {{this.name}};
    {{/each}}
    beforeEach(function () {
        module('templates');
        module('{{module}}');

        module(function ($provide) {
            {{#each deps}}
            {{> (this.partial) this}}
            {{/each}}
        });

        inject(function ($rootScope, _$compile_{{and arg._deps_}}) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            {{#each deps}}
            {{this.name}} = _{{this.name}}_;
            {{/each}}
        });
    });
    beforeEach(function() {
        inject(function () {
            template = '<{{dashCase name}}></{{dashCase name}}>';
            element = $compile(template)($scope);
        });
        $scope.$apply();
        isolatedScope = element.isolateScope();
    });

    it('should make a test', function() {
      pending();
    });
});
