'use strict';

/**
 * @ngdoc directive
 * @name jsUtilsApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('jsUtilsApp')
    .directive('mainMenu', function () {
        return {
            templateUrl: 'views/partials/main-menu.html',
            restrict:    'E'/*,
            link:        function postLink(scope, element, attrs) {

            }*/
        };
    });
