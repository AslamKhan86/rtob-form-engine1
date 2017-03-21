describe('Directive : rtoDate', function () {
    var $scope, $compile,element;
    beforeEach(module('rwb-ui-rto-forms'));
    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new(), $compile = _$compile_;
        element = $compile('<rto-date></rto-date>')($scope);
        $scope.$digest()
    }));
    it('should set defaults', function () {
        expect(element.children()).toBeDefined();
    });
});