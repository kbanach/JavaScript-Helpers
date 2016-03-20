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

function chopTextBySections(options) {
    var words = options.input;
    var sections = options.sections;
    var currentSection = '';
    var loggedSections = {};
    var lines = words.split('\n');

    function lineStartsSection(testedSection) {
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

function parseCommits(options) {
    var output = '';

    var loggedSections = chopTextBySections(options);

    output += beautifyOutput(loggedSections);

    return output;
}

function generateSections(options) {
    var sectionLiterals = angular.copy(options.sectionLiterals);
    var sectionsRegexes = [];

    sectionLiterals.forEach(function (literal) {
        var regexpOptions = '';

        if (_.isString(literal) && !_.isEmpty(literal.trim())) {
            if (options.sectionCaseInsensitive) {
                regexpOptions += 'i';
            }

            sectionsRegexes.push(new RegExp('^' + literal.trim(), regexpOptions));
        }

    });

    return sectionsRegexes;
}

function generateTaskTitle(options) {
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

function commitParserCtrl($scope) {

    var blockRecalculation = false;

    var defaults = {
        showAdvancedOptions:    true,
        input:                  '',
        taskNameInput:          '',
        taskNameEscape:         true,
        taskNameCharToEscape:   '#',
        taskNameEscaper:        ' #',
        listChar:               '*',
        sectionsInput:          '',
        sectionsSeparator:      ',',
        sectionLiterals:        ['added', 'removed', 'fixed', 'modified'],
        sectionCaseInsensitive: true,
        sections:               [
            /added:/i,
            /removed:/i,
            /fixed:/i,
            /modified:/i
        ],
        placeholder:            {
            sections: 'Defaults: added, removed, fixed, modified',
            listChar: 'e.g. "*" or "-"',
            input:    '// example how to fill this field:\n\n' +
                      'Added:\n' +
                      '* thing added\n' +
                      '* another thing added' +
                      '\n\n' +
                      'Removed:\n' +
                      '* unwanted feature to remove' +
                      '\n\n' +
                      'Not matched section:\n' +
                      '* this will be in Others' +
                      '\n\n' +
                      'This text will be totaly ignored'
        }

    };

    function resetToDefaults() {
        blockRecalculation = true;
        $scope.options = angular.copy(defaults);
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
            $scope.options.sectionLiterals = $scope.options.sectionsInput.split($scope.options.sectionsSeparator);
        }

        $scope.options.sections = generateSections($scope.options);
    }

    $scope.reset = resetToDefaults;
    $scope.calculateOutput = recalculateOutput;
    $scope.updateSections = updateSections;

    resetToDefaults();
    recalculateOutput();
}