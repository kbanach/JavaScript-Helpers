/// <reference path="../app.ts" />
'use strict';
function selectElementsContent(elementToSelect) {
    var doc = document;
    if (elementToSelect instanceof HTMLElement) {
        /**
         * code copied from: http://goo.gl/N2cvkS
         */
        if (doc.body.createTextRange) {
            var range = doc.body.createTextRange();
            range.moveToElementText(elementToSelect);
            range.select();
        }
        else if (window.getSelection) {
            var selection = window.getSelection();
            var range = doc.createRange();
            range.selectNodeContents(elementToSelect);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        return true;
    }
    else {
        throw new Error('You can select only HTMLElement');
    }
}
function selectOutput(outputFieldId) {
    selectElementsContent(document.getElementById(outputFieldId));
}
function outputFieldDirective() {
    return {
        templateUrl: 'views/partials/output-field.html',
        restrict: 'E',
        scope: {
            value: '='
        },
        link: function postLink(scope) {
            scope.select = selectOutput;
            scope.output_id = 'commentWrapper_output';
        }
    };
}
angular.module('jsUtilsApp')
    .directive('outputField', outputFieldDirective);
//# sourceMappingURL=outputfield.js.map