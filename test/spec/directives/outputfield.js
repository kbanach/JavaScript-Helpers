'use strict';

describe('Directive: outputField', function () {

    // load the directive's module
    beforeEach(module('jsUtilsApp'));

    //var element;
    var scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    //it('should make hidden element visible', inject(function ($compile) {
    //  element = angular.element('<output-field></output-field>');
    //  element = $compile(element)(scope);
    //  expect(element.text()).toBe('this is the outputField directive');
    //}));
});
