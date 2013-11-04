describe('selectBox', function () {
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

    it("should throw when no optExp attribute is provided", function () {
        expect(function() {
            $compile("<select-box ng-model='myVar'></select-box>")($rootScope);
            $rootScope.$digest();
        }).toThrow('A comprehension expression must be defined with the attribute optExp for selectBox');
    });

    it("should have a root element with the class ngSelectBox", function () {
        $rootScope.options = [1, 2, 3, 4];
        var element = $compile("<select-box ng-model='myVar' opt-exp='t for t in options'></select-box>")($rootScope);
        $rootScope.$digest();
        expect(element.hasClass("ngSelectBox")).toBe(true);
    });
});