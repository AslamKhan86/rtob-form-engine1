describe('Service: ServiceURL', function () {
    var initSpy;
    beforeEach(module('rwb-ui-rto-forms'));

    it('call the service url for apidev', function () {
        initSpy = jasmine.createSpy('ServiceURL');
        initSpy("apidev");
        expect(initSpy).toHaveBeenCalledWith("apidev");
    });
});
