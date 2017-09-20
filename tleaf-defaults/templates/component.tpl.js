{{#if opts.useStrict}}
'use strict';

{{/if}}
describe('Component: {{name}}', function () {

	var component, bindings;
	var $scope, $componentController{{and arg.deps}};

	beforeEach(function () {

		module('{{module}}');

		module(function ($provide) {
			{{#each deps}}
			{{> (this.partial) this}}
			{{/each}}
		});

		inject(function ($rootScope, _$componentController_{{and arg._deps_}}) {
			bindings = {};
			$scope = $rootScope.$new();
			$componentController = _$componentController_;
			{{#each deps}}
			{{this.name}} = _{{this.name}}_;
			{{/each}}
		});

	});

	// Specs here
	{{#if opts.includeSamples }}
	/*
	it('should return a property value', function () {
		component = $componentController('{{name}}', {
			$scope: $scope
		}, bindings);
		expect(component.foo).toBe('bar');
	});

	it('should return a method value', function () {
		component = $componentController('{{name}}', {
			$scope: $scope
		}, bindings);
		expect(component.baz()).toBe('qux');
	});
	*/
	{{/if}}

});

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
