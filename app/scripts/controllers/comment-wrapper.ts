/// <reference path="../app.ts" />

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


class CommentPlaceholders {
    lineStart:string;
    lineEnd:string;
    fillChar:string;
    varConcatChar:string;
    varsToList:string;
    varEscapePrefix:string;
    varEscapePostfix:string;
    varNamePostfix:string;

    constructor() {
        this.setDefaults();
    }

    setDefaults() {
        this.lineStart = 'console.log(';
        this.lineEnd = ');';
        this.fillChar = 'e.g. "*" or "="';
        this.varConcatChar = 'e.g. "," or "+"';
        this.varsToList = 'lorem, ipsum, dolor';
        this.varEscapePrefix = 'JSON.stringify(';
        this.varEscapePostfix = ', false, "\\t")';
        this.varNamePostfix = 'e.g. ":" or "="';
    }

}

class CommentOptions {
    lineStart:string;
    lineEnd:string;
    stringEscapeChar:string;
    lineLength:number;
    fillChar:string;
    showAdvancedOptions:boolean;
    additionalEmptySpacer:boolean;
    borderAround:boolean;
    escapeStringEscapeChars:boolean;
    endOfLineChar:string;
    varsToList:string;
    varNamePostfix:string;
    varsToListSeparator:string;
    varConcatChar:string;
    varEscapePrefix:string;
    varEscapePostfix:string;
    input:string;
    output: string;

    placeholder: CommentPlaceholders;

    private _presets: Object;

    constructor () {
        this.setDefaults();
    }

    setDefaults() {
        this.lineStart = 'console.log(';
        this.lineEnd = ');';
        this.stringEscapeChar = '\'';
        this.lineLength = 60;
        this.fillChar = '*';
        this.showAdvancedOptions = false;
        this.additionalEmptySpacer = true;
        this.borderAround = true;
        this.escapeStringEscapeChars = true;
        this.endOfLineChar = '\n';
        this.varsToList = '';
        this.varNamePostfix = ':';
        this.varsToListSeparator = ',';
        this.varConcatChar = ',';
        this.varEscapePrefix = '';
        this.varEscapePostfix = '';
        this.input = 'Put your comment\nhere';
        this.output = '';

        this.placeholder = new CommentPlaceholders();

        this._presets = {
            'androidstudio': {
                presetName:              'Android Studio',
                lineStart:               'Log.i(TAG, ',
                lineEnd:                 ');',
                lineLength:              80,
                stringEscapeChar:        '\"',
                varConcatChar:           '+',
                varEscapePrefix:         '',
                varEscapePostfix:        '.toString()',
                input:                   'Android Studio preset loaded!\nLoad LOG class and add an TAG string'
            },
            'browser': {
                lineStart:               'console.log(',
                lineEnd:                 ');',
                escapeStringEscapeChars: true,
                stringEscapeChar:        '\'',
                presetName:              'Browser',
                lineLength:              60,
                varEscapePrefix:         '',
                varEscapePostfix:        '',
                varConcatChar:           ',',
                input:                   'Browser preset loaded!'
            },
            'javascriptcomment': {
                presetName:              'JS Comment',
                lineStart:               '// ',
                lineEnd:                 '',
                stringEscapeChar:        '',
                lineLength:              60,
                fillChar:                '*',
                additionalEmptySpacer:   true,
                borderAround:            true,
                escapeStringEscapeChars: false,
                endOfLineChar:           '\n',
                input:                   'JS Comment preset loaded!'
            },
            'nodejs': {
                lineStart:               'console.log(',
                lineEnd:                 ');',
                escapeStringEscapeChars: true,
                stringEscapeChar:        '\'',
                presetName:              'NodeJS',
                lineLength:              60,
                varEscapePrefix:         'util.inspect(',
                varEscapePostfix:        ', false, 3)',
                varConcatChar:           ',',
                input:                   'NodeJS preset loaded!\nDon`t forget to require "util" Node package'
            },
            'python3': {
                lineStart:               'print(',
                lineEnd:                 ')',
                escapeStringEscapeChars: true,
                stringEscapeChar:        '\'',
                presetName:              'Python 3.x',
                lineLength:              60,
                varEscapePrefix:         'str(',
                varEscapePostfix:        ')',
                varConcatChar:           ' + ',
                input:                   'Python 3.x preset loaded!'
            }
        };
    }

    setPreset(presetName: string) {
        if (this._presets[presetName]) {
            _.extend(this, this._presets[presetName]);
        } else {
            console.log(`Preset "${presetName}" not found`);
        }
    }

    getPresets() {
        return _.mapValues(this._presets, 'presetName');
    }
}

function charChain(char: string, length: number) {
    var output = '';

    for (var i = 0; i < length; i++) {
        output += char;
    }

    return output;
}

function escapeCharInWholeString(charToEscape: string, string: string) {
    return string.replace(new RegExp(charToEscape, 'g'), '\\' + charToEscape);
}

function fillLine(line: string, availableLineCharsLength: number, options: CommentOptions) {
    var output = '';

    var fillLength = availableLineCharsLength - line.length;

    var preStringLength = Math.round(fillLength / 2);
    var postStringLength = (fillLength - preStringLength);

    var preString = charChain(options.fillChar, preStringLength + (options.borderAround ? 1 : 0) );
    var postString = charChain(options.fillChar, postStringLength + (options.borderAround ? 1 : 0) );

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
        output = escapeCharInWholeString(options.stringEscapeChar, output);
    }

    return output;
}

function wrapLineInChars(line: string, options: CommentOptions) {
    var output = '';

    if (line) {
        var additionalCharsLength = (2 * options.fillChar.length * (options.borderAround  ? 1 : 0)
             + 2 * (options.additionalEmptySpacer ? 1 : 0) );
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

function generateEmptyLine(options: CommentOptions) {
    var output = '';

    output += options.lineStart
        + options.stringEscapeChar
        + charChain(options.fillChar, options.lineLength)
        + options.stringEscapeChar
        + options.lineEnd
        + options.endOfLineChar;

    return output;
}

function generateLine(line: string, options: CommentOptions) {
    var output = '';

    if (line) {
        output += wrapLineInChars(line, options);
    }

    return output;
}

function varLog(varName: string, options: CommentOptions) {
    var output = '';

    if (varName && typeof varName === 'string') {
        var escapedVarName = varName;

        if (options.escapeStringEscapeChars) {
            escapedVarName = escapeCharInWholeString(options.stringEscapeChar, escapedVarName);
        }

        output += options.lineStart
            + options.stringEscapeChar
            + options.fillChar;

        if (options.additionalEmptySpacer) {
            output += ' ';
        }

        output += escapedVarName
            + options.varNamePostfix
            + ' '
            + options.stringEscapeChar
            + options.varConcatChar
            + options.varEscapePrefix
            + varName
            + options.varEscapePostfix
            + options.lineEnd
            + options.endOfLineChar;
    }

    return output;
}

function generateComment(options: CommentOptions) {
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


function commentWrapperCtrl($scope) {
    var blockRecalculation = false;

    function recalculateOutput() {
        if (!blockRecalculation) {
            $scope.output = generateComment($scope.options);
        }
    }

    function resetToDefaults() {
        blockRecalculation = true;
        $scope.options.setDefaults();
        blockRecalculation = false;
        recalculateOutput();
    }

    function loadPreset(preset: string) {
        blockRecalculation = true;
        $scope.options.setPreset(preset);
        blockRecalculation = false;
        recalculateOutput();
    }

    $scope.options = new CommentOptions();
    $scope.presets = $scope.options.getPresets();

    $scope.calculateOutput = recalculateOutput;
    $scope.loadPreset = loadPreset;
    $scope.reset = resetToDefaults;

    recalculateOutput();
}
