describe('slideToggle', function () {
    var $compile;
    var $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module('angular-form-ui'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it("should have a root element with the class ngSlideToggle", function () {
        var element = $compile("<slide-toggle ng-model='myVar'></slide-toggle>")($rootScope);
        $rootScope.$digest();
        expect(element.hasClass("ngSlideToggle")).toBe(true);
    });
});