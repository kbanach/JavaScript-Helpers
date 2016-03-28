/// <reference path="../app.ts" />

'use strict';

/**
 * @ngdoc function
 * @name jsUtilsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jsUtilsApp
 */

angular.module('jsUtilsApp')
    .controller('CommitParserCtrl', commitParserCtrl);

function chopTextBySections(options: CommitParseOptions) {
    var words = options.input;
    var sections = options.sections;
    var currentSection = '';
    var loggedSections = {};
    var lines = words.split('\n');

    function lineStartsSection(testedSection: RegExp) {
        if (testedSection.test(lines[key])) {
            keywordLine = true;
        }
    }

    for (var key in lines) {
        if (lines.hasOwnProperty(key)) {
            var keywordLine = false;
            sections.forEach(lineStartsSection);

            if (keywordLine) {
                currentSection = lines[key].trim();

                continue;
            } else if (lines[key].trim()[0] === options.listChar) {
                if (typeof loggedSections[currentSection] === 'undefined') {
                    loggedSections[currentSection] = '';
                }
                loggedSections[currentSection] += '\n' + lines[key].trim();
            } else {
                currentSection = 'Others:';
            }
        }

    }

    return loggedSections;
}

function beautifyOutput(loggedSections) {
    var output = '';

    for (var key in loggedSections) {
        if (loggedSections.hasOwnProperty(key)) {
            output += key;
            output += loggedSections[key];

            output += '\n\n';
        }
    }

    return output;
}

function parseCommits(options: CommitParseOptions) {
    var output = '';

    var loggedSections = chopTextBySections(options);

    output += beautifyOutput(loggedSections);

    return output;
}

function generateTaskTitle(options: CommitParseOptions) {
    var taskName = angular.copy(options.taskNameInput);
    var output = '';

    if (_.isString(taskName)) {
        taskName = taskName.trim();

        if (!_.isEmpty(taskName)) {
            if (options.taskNameEscape && taskName[0] === options.taskNameCharToEscape) {
                taskName = taskName.substring(1);
                output += options.taskNameEscaper;
            }

            output += taskName + '\n\n';
        }
    }

    return output;
}

class CommitParsePlaceholders {
    sections: string;
    listChar: string;
    input: string;

    constructor(options: CommitParseOptions) {
        this.setDefaults(options);
    }

    setDefaults(options: CommitParseOptions) {
        let listChar = options.listChar;

        this.sections = 'Defaults: added, removed, fixed, modified';
        this.listChar = 'e.g. "*" or "-"';
        this.input = '// example how to fill this field:\n\n' +
            'Added:\n' +
            listChar + ' thing added\n' +
            listChar + ' another thing added' +
            '\n\n' +
            'Removed:\n' +
            listChar + ' unwanted feature to remove' +
            '\n\n' +
            'Not matched section:\n' +
            listChar + ' this will be in Others' +
            '\n\n' +
            'This text will be totaly ignored';
    }
}

class CommitParseOptions {
    showAdvancedOptions:boolean;
    input:string;
    taskNameInput:string;
    taskNameEscape:boolean;
    taskNameCharToEscape:string;
    taskNameEscaper:string;
    listChar:string;
    sectionsInput:string;
    sectionsSeparator:string;
    sectionLiterals:string[];
    sectionCaseInsensitive:boolean;
    sections:RegExp[];

    placeholder: CommitParsePlaceholders;

    constructor() {
        this.setDefaults();
    }

    setDefaults() {
        this.showAdvancedOptions = true;
        this.input = '';
        this.taskNameInput = '';
        this.taskNameEscape = true;
        this.taskNameCharToEscape = '#';
        this.taskNameEscaper = ' #';
        this.listChar = '*';
        this.sectionsInput = '';
        this.sectionsSeparator = ',';
        this.sectionLiterals = ['added', 'removed', 'fixed', 'modified'];
        this.sectionCaseInsensitive = true;
        this.sections = [
            /added:/i,
            /removed:/i,
            /fixed:/i,
            /modified:/i
        ];

        this.placeholder = new CommitParsePlaceholders(this);
    }

    updateSections(newSections: string) {
        this.sectionLiterals = newSections.split(this.sectionsSeparator);
        this.updateSectionRegExps();
    }

    private updateSectionRegExps() {
        let self = this;

        this.sections = [];

        this.sectionLiterals.forEach( literal => {
            var regexpOptions = '';

            if (_.isString(literal) && !_.isEmpty(literal.trim())) {
                if (self.sectionCaseInsensitive) {
                    regexpOptions += 'i';
                }

                self.sections.push(new RegExp('^' + literal.trim(), regexpOptions));
            }
        });
    }
}

function commitParserCtrl($scope) {
    var blockRecalculation = false;

    function resetToDefaults() {
        blockRecalculation = true;
        $scope.options.setDefaults();
        blockRecalculation = false;
        updateSections();
        recalculateOutput();
    }

    function recalculateOutput() {
        if (!blockRecalculation) {
            $scope.output = generateTaskTitle($scope.options) +
                parseCommits($scope.options);
        }
    }

    function updateSections() {
        if ($scope.options.sectionsInput.trim()) {
            $scope.options.updateSections($scope.options.sectionsInput);
        }

        recalculateOutput();
    }

    $scope.options = new CommitParseOptions();

    $scope.reset = resetToDefaults;
    $scope.calculateOutput = recalculateOutput;
    $scope.updateSections = updateSections;

    resetToDefaults();
    recalculateOutput();
}