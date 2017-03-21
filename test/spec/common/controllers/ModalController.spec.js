describe('Controller: ModalController', function () {
    beforeEach(module('rwb-ui-rto-forms'));
    var ModalCtrl, scope;
    beforeEach(inject(function (_$controller_, _$rootScope_) {
        scope = _$rootScope_.$new();
        ModalCtrl = _$controller_('ModalController', {
            '$scope': scope,
            '$rootScope': _$rootScope_
        });
    }));
    it('Controller should be defined', function () {
        expect(ModalCtrl).toBeDefined();
    });
    it('should set the item property values', function () {
        expect(scope.item).toBeDefined();
    });
    it('should set the appError property values', function () {
        expect(scope.appError).toBeDefined();
    });
    it('should set the error values', function () {
        expect(scope.item).toBeDefined();
    });
});
