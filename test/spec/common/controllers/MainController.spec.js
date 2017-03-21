describe('Controller: MainController', function () {
  beforeEach(module('rwb-ui-rto-forms'));
  var MainCtrl, scope;
  beforeEach(inject(function (_$controller_,_$rootScope_) {
    scope = _$rootScope_.$new();
    MainCtrl = _$controller_('MainController', {
      '$scope': scope
    });
  }));

  it('should instantiate the applicationData', function () {
    expect(scope.applicationData).toBeDefined();
  });

});
