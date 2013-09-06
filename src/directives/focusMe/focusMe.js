angular.module('angular-form-ui').
    /**
     * <input focus-me/>
     */
    directive('focusMe', ['$timeout', function ($timeout) {
        return {
            link: function (scope, element) {
                $timeout(function () {
                    element[0].focus();
                });
            }
        };
    }]);