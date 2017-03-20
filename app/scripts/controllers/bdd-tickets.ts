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
    .controller('BddTicketsCtrl', bddTicketsCtrl);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function reverseString(string) {
    return string.split('').reverse().join('');
}

class InputField {
    label: string;
    value: string;

    constructor(label: string) {
        this.label = label;
        this.value = '';
    }
}

class FieldType {
    type: string;
    readableName: string;
    output: string;

    fields: InputField[];

    constructor(type: string) {
        this.type = type;
        this.readableName = capitalizeFirstLetter(type);
        this.fields = [];
    }

    add() {
        var label = _.uniqueId(this.type + '_');
        this.fields.push(new InputField(label));
    }

    remove(id) {
        var removedFields = _.remove(this.fields, function (field: InputField) {
            return field.label === id;
        });

        return removedFields;
    }

    getValues() {
        return _.map(this.fields, 'value');
    }
}

function beautifyTypeOutput(fieldsValues, options) {
    var output = '';

    _.forEach(fieldsValues, function (fieldValue, index) {
        if (fieldValue.trim()) {
            if (index) {
                output += '\n' +
                    options.andWrapper +
                    options.andLiteral +
                    reverseString(options.andWrapper) +
                    ' ';
            }

            output += fieldValue;
        }
    });

    return output;
}

function getHeader(options) {
    var output = '';
    var headerContainer;

    if (_.isEmpty(options.header.trim())) {
        return output;
    }

    output += options.headerWrapper +
        options.header +
        reverseString(options.headerWrapper);

    if (!_.isEmpty(options.headerContainer.trim())) {
        headerContainer = options.headerContainer;


        console.log('************************************************************');
        console.log('************************** lalala **************************');
        console.log('************************************************************');
        console.log('* headerContainer: ',headerContainer);
        console.log('************************************************************');
        console.log('* options.headerContainerPlaceholder: ',options.headerContainerPlaceholder);
        console.log('************************************************************');
        console.log('* output: ',output);
        console.log('************************************************************');



        if (_.includes(headerContainer, options.headerContainerPlaceholder)) {
            headerContainer = headerContainer.replace(options.headerContainerPlaceholder, output);

            output = headerContainer;
        } else {
            output = headerContainer + '\n' + output;
        }
    }

    output = output + '\n';

    if (options.spaceBetween) {
        output += '\n';
    }

    return output;
}

function getFooter(options) {
    return options.footer;
}

function getReadableOutput(options) {
    var output = '';

    output += getHeader(options);

    _.forEach(options.fieldTypes, function (fieldType, index) {
        var field = options[fieldType];

        if (index) {
            output += '\n';
        }

        output += options.typeWrapper +
            field.readableName +
            reverseString(options.typeWrapper) +
            ' ' +
            beautifyTypeOutput(field.getValues(), options);

        if (options.spaceBetween) {
            output += '\n';
        }
    });

    output += getFooter(options);

    return output;
}

function bddTicketsCtrl($scope) {

    var blockRecalculation = false;

    var defaults = {
        fieldTypes: ['given', 'when', 'then'],
        fieldTypesPlaceholders: [
            'state of app, e.g. logged as Administrator to Reports site',
            'action/trigger of behaviour, e.g. button "Generate report" is clicked',
            'expected result, e.g. download popup is visible'
        ],
        typeWrapper: '*',
        andWrapper: '_',
        andLiteral: 'And',
        header: 'Scenario #1',
        headerContainer: '{panel:title=%h}',
        footer: '{panel}',
        headerContainerPlaceholder: '%h',
        headerWrapper: '_*',
        spaceBetween: true,
        showOptions: false,
        placeholder: {
            typeWrapper: 'char which will be around step name, e.g. * will wrap Given to *Given*',
            andWrapper: 'char which will be around And, e.g. _ will wrap it to _And_',
            header: 'e.g. Scenario #1',
            footer: 'e.g. {panel}',
            headerContainer: 'an container to Header (put %h as a placeholder), e.g. {panel:title=%h}',
            headerWrapper: 'char which will be around And, e.g. _* will wrap it to _*Secenario #1*_'
        }

    };

    function generateFields(options) {
        if (_.isArray(options.fieldTypes)) {
            _.forEach(options.fieldTypes, function (type) {
                options[type] = new FieldType(type);
                options[type].add();
            });
        }
    }

    function resetToDefaults() {
        blockRecalculation = true;
        $scope.options = angular.copy(defaults);
        generateFields($scope.options);
        blockRecalculation = false;
        recalculateOutput();
    }

    function recalculateOutput() {
        if (!blockRecalculation) {
            $scope.output = getReadableOutput($scope.options);
        }
    }

    function addField(type) {
        if (_.get($scope.options, type)) {
            return $scope.options[type].add();
        }
    }

    function removeField(type, id) {
        var removedFields;

        if (_.get($scope.options, type)) {
            removedFields = $scope.options[type].remove(id);
            recalculateOutput();

            return removedFields;
        }
    }

    function updateFields(type) {
        var updatedFields;

        if (_.get($scope.options, type)) {
            updatedFields = $scope.options[type].getValues();
        }

        recalculateOutput();

        return updatedFields;
    }

    function updateStepFieldsTypes() {
        generateFields($scope.options);
        recalculateOutput();
    }

    $scope.reset = resetToDefaults;
    $scope.calculateOutput = recalculateOutput;
    $scope.updateStepFieldsTypes = updateStepFieldsTypes;
    $scope.addField = addField;
    $scope.removeField = removeField;
    $scope.updateFields = updateFields;

    resetToDefaults();
    recalculateOutput();
}