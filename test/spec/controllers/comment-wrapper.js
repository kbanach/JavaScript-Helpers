'use strict';

describe('Controller: CommentWrapperCtrl', function () {
    it('shall pass', function () {
        expect(true).toBe(true);
    });

    // load the controller's module
    beforeEach(module('jsUtilsApp'));

    var CommentWrapperCtrl,
        scope;

    function setInput(newOutput) {
        scope.options.input = newOutput;
        scope.calculateOutput();
    }

    function setVarInput(newVarsToList) {
        scope.options.varsToList = newVarsToList;
        scope.calculateOutput();
    }

    function getOutput() {
        return scope.output;
    }

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        CommentWrapperCtrl = $controller('CommentWrapperCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));

    it('should have options exposed', function () {
        expect(scope.options).toEqual(jasmine.any(Object));
    });

    it('should wrap comment content properly', function () {
        var testString = 'Lorem ipsum dolor sit amet';
        setInput(testString);

        expect(getOutput()).toContain(testString);
    });


    it('should generate required length of chars', function () {
        var oneChar = '0';
        var fillChar = scope.options.fillChar;
        var lineLength = 5;

        scope.options.lineLength = lineLength;

        setInput(oneChar);

        // e.g. /[*]{1} 0 [*]{1}/
        var oneCharLineRegExp = new RegExp('[' + fillChar + ']{1} ' + oneChar + ' [' + fillChar + ']{1}');
        expect(getOutput()).toMatch(oneCharLineRegExp);

        // e.g. /[*]{60}/
        var fillCharLineRegExp = new RegExp('[' + fillChar + ']{'+ lineLength +'}');
        expect(getOutput()).toMatch(fillCharLineRegExp);
    });

    it('should escape quote chars sign', function () {
        var testString = '\'';
        setInput(testString);

        expect(getOutput()).toContain('\\' + testString);
    });


    it('should list variables in new lines', function () {
        var testVariableNames = 'lorem, ipsum, dolor';
        setVarInput(testVariableNames);

        var regexTests = [
            new RegExp('(lorem[*\', ():]+){2}', 'g'),
            new RegExp('(ipsum[*\', ():]+){2}', 'g'),
            new RegExp('(dolor[*\', ():]+){2}', 'g')
        ];

        regexTests.forEach(function(regex) {
            expect(getOutput()).toMatch(regex);
        });
    });
    


});
