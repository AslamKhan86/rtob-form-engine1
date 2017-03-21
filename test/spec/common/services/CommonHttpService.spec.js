describe('Service: CommonHttpService', function () {
    beforeEach(function () {
        module('rwb-ui-rto-forms')
    });

    it('should call the set data method with response', function () {
        var reactiveResult = jasmine.createSpyObj('HttpService', ['setData']);
        var HttpService = jasmine.createSpy('HttpService').and.returnValue(reactiveResult);
        HttpService({}).setData("response");
        expect(reactiveResult.setData).toHaveBeenCalledWith("response");
    });
});
