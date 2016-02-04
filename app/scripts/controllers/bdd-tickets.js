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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function InputField(label) {
    this.label = label;
    this.value = '';
}

function FieldType(type) {
    this.type = type;
    this.readableName = capitalizeFirstLetter(type);
    this.fields = [];
    this.output = '';
}

FieldType.prototype.add = function () {
    var label = _.uniqueId(this.type + '_');
    this.fields.push(new InputField(label));
};

FieldType.prototype.remove = function (id) {
    var removedFields = _.remove(this.fields, function (field) {
        return field.label === id;
    });

    return removedFields;
};

FieldType.prototype.getValues = function () {
    return _.map(this.fields, 'value');
};

function beautifyTypeOutput(fieldsValues, options) {
    var output = '';

    _.forEach(fieldsValues, function (fieldValue, index) {
        if (fieldValue.trim()) {
            if (index) {
                output += '\n' + options.andWrapper + options.andLiteral + options.andWrapper + ' ';
            }

            output += fieldValue;
        }
    });

    return output;
}

function getReadableOutput(options) {
    var output = '';

    _.forEach(options.fieldTypes, function (fieldType, index) {
        var field = options[fieldType];

        if (index) {
            output += '\n';
        }

        output += options.typeWrapper +
            field.readableName +
            options.typeWrapper +
            ' ' +
            beautifyTypeOutput(field.getValues(), options) +
            '\n';
    });

    return output;
}

function bddTicketsCtrl($scope) {

    var blockRecalculation = false;

    var defaults = {
        fieldTypes:  ['given', 'when', 'then'],
        typeWrapper:  '*',
        andWrapper:  '_',
        andLiteral:  'And',
        placeholder: {
            given: 'e.g. logged as Administrator to Reports site',
            when: 'e.g. button "Generate report" is clicked',
            then: 'e.g. download popup is visible',
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

    function selectOutput() {
        selectElementsContent(document.getElementById('commitParser_output'));
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

    $scope.reset = resetToDefaults;
    $scope.select = selectOutput;
    $scope.calculateOutput = recalculateOutput;
    $scope.addField = addField;
    $scope.removeField = removeField;
    $scope.updateFields = updateFields;

    resetToDefaults();
    recalculateOutput();
}