'use strict';

describe('Controller: CommentWrapperCtrl', function () {

  // load the controller's module
  beforeEach(module('jsUtilsApp'));

  var CommentWrapperCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommentWrapperCtrl = $controller('CommentWrapperCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CommentWrapperCtrl.awesomeThings.length).toBe(3);
  });
});
