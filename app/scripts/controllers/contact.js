'use strict';

/**
 * @ngdoc function
 * @name jsUtilsApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the jsUtilsApp
 */
angular.module('jsUtilsApp')
    .controller('ContactCtrl', [
        '$scope', function ($scope) {
            $scope.gitHubLink = 'https://github.com/kbanach/js_utils';
        }
    ]);
