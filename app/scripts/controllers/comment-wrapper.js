'use strict';

/**
 * @ngdoc function
 * @name jsUtilsApp.controller:CommentWrapperCtrl
 * @description
 * # CommentWrapperCtrl
 * Controller of the jsUtilsApp
 */
angular.module('jsUtilsApp')
    .controller('CommentWrapperCtrl', [
        '$scope', commentWrapperCtrl
    ]);

function charChain(char, length) {
    var output = '';

    for (var i = 0; i < length; i++) {
        output += char;
    }

    return output;
}

function fillLine(line, availableLineCharsLength, options) {
    var output = '';

    var fillLength = availableLineCharsLength - line.length;

    var preStringLength = Math.round(fillLength / 2);
    var postStringLength = (fillLength - preStringLength);

    var preString = charChain(options.fillChar, preStringLength + (1 * options.borderAround));
    var postString = charChain(options.fillChar, postStringLength + (1 * options.borderAround));

    output += preString;

    if (options.additionalEmptySpacer) {
        output += ' ';
    }
    output += line;

    if (options.additionalEmptySpacer) {
        output += ' ';
    }
    output += postString;

    if (options.escapeStringEscapeChars) {
        output = output.replace(options.stringEscapeChar, '\\' + options.stringEscapeChar, 'g');
    }

    return output;
}

function wrapLineInChars(line, options) {
    var output = '';

    if (line) {
        var additionalCharsLength = (2 * options.fillChar.length * options.borderAround + 2 * options.additionalEmptySpacer);
        var availableLineCharsLength = options.lineLength - additionalCharsLength;

        if (line.length < availableLineCharsLength) {
            output = options.lineStart
                + options.stringEscapeChar
                + fillLine(line, availableLineCharsLength, options)
                + options.stringEscapeChar
                + options.lineEnd
                + options.endOfLineChar;
        } else {
            var tempLine;
            var carret = 0;

            while (carret < line.length) {
                tempLine = line.slice(carret, carret + availableLineCharsLength);

                output += options.lineStart
                    + options.stringEscapeChar
                    + fillLine(tempLine, availableLineCharsLength, options)
                    + options.stringEscapeChar
                    + options.lineEnd
                    + options.endOfLineChar;

                carret += availableLineCharsLength;
            }
        }
    }

    return output;
}

function generateEmptyLine(options) {
    var output = '';

    output += options.lineStart
        + options.stringEscapeChar
        + charChain(options.fillChar, options.lineLength)
        + options.stringEscapeChar
        + options.lineEnd
        + options.endOfLineChar;

    return output;
}

function generateLine(line, options) {
    var output = '';

    if (line) {
        output += wrapLineInChars(line, options);
    }

    return output;
}

function varLog(varName, options) {
    var output = '';

    if (varName && typeof varName === 'string') {
        output += options.lineStart
            + options.stringEscapeChar
            + options.fillChar;

        if (options.additionalEmptySpacer) {
            output += ' ';
        }

        output += varName + options.stringEscapeChar + ', ' + varName + options.lineEnd + options.endOfLineChar;
    }

    return output;
}

function generateComment(options) {
    var output = '';
    var lines = options.input.split('\n');

    if (options.borderAround) {
        output += generateEmptyLine(options);
    }

    for (var i = 0; i < lines.length; i++) {
        output += generateLine(lines[i].trim(), options);
    }

    if (options.varsToList) {
        var varsList = options.varsToList.split(options.varsToListSeparator);

        for (var i = 0; i < varsList.length; i++) {

            if (options.borderAround) {
                output += generateEmptyLine(options);
            }

            output += varLog(varsList[i].trim(), options);
        }
    }

    if (options.borderAround) {
        output += generateEmptyLine(options);
    }

    return output;
}

function selectElementsContent(elementToSelect) {
    if (elementToSelect instanceof HTMLElement) {
        /**
         * code copied from: http://goo.gl/N2cvkS
         */
        if (document.body.createTextRange) { // ms
            var range = document.body.createTextRange();
            range.moveToElementText(elementToSelect);
            range.select();
        } else if (window.getSelection) { // moz, opera, webkit
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(elementToSelect);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        return true;
    } else {
        throw new Error('You can select only HTMLElement');
    }
}

function commentWrapperCtrl($scope) {
    var blockRecalculation = false;

    function recalculateOutput() {
        if (!blockRecalculation) {
            $scope.output = generateComment($scope.options);
        }
    }

    function resetToDefaults() {
        blockRecalculation = true;
        $scope.options = angular.copy(defaults);
        blockRecalculation = false;
        recalculateOutput();
    }

    function selectOutput() {
        selectElementsContent(document.getElementById('commentWrapper_output'));
    }

    var defaults = {
        lineStart:               'console.log(',
        lineEnd:                 ');',
        stringEscapeChar:        '\'',
        lineLength:              60,
        fillChar:                '*',
        additionalEmptySpacer:   true,
        borderAround:            true,
        escapeStringEscapeChars: true,
        endOfLineChar:           '\n',
        varsToList:              '',
        varsToListSeparator:     ',',
        input:                   'Lorem\nipsum\n\ndolor'
    };

    $scope.options = angular.copy(defaults);
    $scope.calculateOutput = recalculateOutput;
    $scope.reset = resetToDefaults;
    $scope.select = selectOutput;

    recalculateOutput();
}