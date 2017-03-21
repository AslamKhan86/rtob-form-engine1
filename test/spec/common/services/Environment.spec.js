describe("Constant: Environment", function () {
    beforeEach(function () {
        module("config");
    });
    it("should be a boolean", inject(function (BASE_URL) {
        expect(BASE_URL).toBeDefined();
        expect(typeof BASE_URL.name).toBe("string");
    }));
});
