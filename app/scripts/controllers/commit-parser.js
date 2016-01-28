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

function chopTextBySections(options) {
    var words = options.input;
    var sections = options.sections;
    var currentSection = '';
    var loggedSections = {};
    var lines = words.split('\n');

    function lineStartsSection(testedLine) {
        if (testedLine.test(lines[key])) {
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
            } else if (lines[key].trim()[0] === '*') {
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

            output += '\n';
        }
    }

    return output;
}

function parseCommits(options) {
    var output = '';

    var loggedSections = chopTextBySections(options);

    output += beautifyOutput(loggedSections, options);

    return output;
}

function generateSections(options) {
    var sectionLiterals = angular.copy(options.sectionLiterals);
    var sectionsRegexes = [];

    sectionLiterals.forEach(function (literal) {
        var regexpOptions = '';

        if (typeof literal === 'string' && literal.trim() !== '') {
            if (options.sectionCaseInsensitive) {
                regexpOptions += 'i';
            }

            sectionsRegexes.push(new RegExp(literal, regexpOptions));
        }

    });

    return sectionsRegexes;
}

function commitParserCtrl($scope) {

    var blockRecalculation = false;

    var defaults = {
        showAdvancedOptions:    true,
        input:                  '',
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
            input:    'Added:\n' +
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
            $scope.output = parseCommits($scope.options);
        }
    }

    function selectOutput() {
        selectElementsContent(document.getElementById('commitParser_output'));
    }

    function updateSections() {
        if ($scope.options.sectionsInput.trim()) {
            $scope.options.sectionLiterals = $scope.options.sectionsInput.split($scope.options.sectionsSeparator);
        }

        $scope.options.sections = generateSections($scope.options);

        console.log('New sections: ', $scope.options.sections);
    }

    $scope.reset = resetToDefaults;
    $scope.select = selectOutput;
    $scope.calculateOutput = recalculateOutput;
    $scope.updateSections = updateSections;

    resetToDefaults();
    recalculateOutput();
}