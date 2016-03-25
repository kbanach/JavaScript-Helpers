/// <reference path='../../_all.ts' />

'use strict';

declare var module:any;

describe('Directive: credits', () => {


    // load the directive's module
    beforeEach(module('jsUtilsApp'));

    // var element:JQuery;
    var scope:ng.IScope;

    beforeEach(inject(($rootScope:ng.IRootScopeService) => {
        scope = $rootScope.$new();
    }));

    // it('should make hidden element visible', inject(($compile:ng.ICompileService) => {
    //     element = angular.element('<credits></credits>');
    //     element = $compile(element)(scope);
    //     expect(element.text()).toBe('this is the credits directive');
    // }));
});
