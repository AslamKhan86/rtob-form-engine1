describe('Directive : rtoTextbox', function () {
    var $scope, $compile,element,setPagingData;
    beforeEach(module('rwb-ui-rto-forms'));
    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new(), $compile = _$compile_;
        element = $compile('<rto-textbox></rto-textbox>')($scope);
        $scope.$digest()
    }));
    it('should set defaults', function () {
        expect(element.children()).toBeDefined();
    });

    it('should call setPagingData with data, page, pageSize', function () {
        setPagingData = jasmine.createSpy('setPagingData');
        setPagingData("data", "page", "pageSize");
        expect(setPagingData).toHaveBeenCalledWith("data", "page", "pageSize");
    });
});