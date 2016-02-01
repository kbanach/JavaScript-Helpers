'use strict';

/**
 * @ngdoc overview
 * @name jsUtilsApp
 * @description
 * # jsUtilsApp
 *
 * Main module of the application.
 */
angular
    .module('jsUtilsApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            //.when('/', {
            //    templateUrl:  'views/main.html',
            //    controller:   'MainCtrl',
            //    controllerAs: 'main'
            //})
            .when('/about', {
                templateUrl:  'views/about.html',
                controller:   'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/', {
            //.when('/comment-wrapper', {
                templateUrl:  'views/comment-wrapper.html',
                controller:   'CommentWrapperCtrl',
                controllerAs: 'commentWrapper'
            })
            .when('/contact', {
                templateUrl:  'views/contact.html',
                controller:   'ContactCtrl',
                controllerAs: 'contact'
            })
            .when('/commits', {
                templateUrl:  'views/commit-parser.html',
                controller:   'CommitParserCtrl',
                controllerAs: 'commitParser'
            })
            .when('/bdd', {
                templateUrl:  'views/bdd-tickets.html',
                controller:   'BddTicketsCtrl',
                controllerAs: 'bddTickets'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
