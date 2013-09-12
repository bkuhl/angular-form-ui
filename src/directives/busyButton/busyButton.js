angular.module('angular-form-ui').
    /**
     * <button busy-button="Saving..." ng-click="save()">Save</button>
     * Required attribute: ng-click="[expression]"
     */
    directive('busyButton', function () {
        return {
            restrict: 'A',
            controller: ['$scope', function ($scope) {
                $scope.busy = false;
                $scope.isBusy = function () {
                    return $scope.busy;
                };
            }],
            link: function (scope, el, attrs) {
                if (angular.isUndefined(attrs.ngClick)) {
                    throw new Error("busyButton must be used in conjunction with ngClick");
                }

                //with click events, handle "busy" status
                var functionName = "callback"+Math.floor(Math.random() * 10001),//use a random method name, so there can be more than 1 on the same page
                    onClick = attrs.ngClick, //cache ngClick so attrs.$set doesn't override it
                    config = {
                        busyText: attrs.busyButton
                    },
                    originalText = el.text(),
                    busyCheck = 'isBusy()';

                //wrap onClick so we can enable "busy" status
                scope[functionName] = function () {
                    //if it's already busy, don't accept a new click
                    if (scope.$eval(busyCheck) === true) {
                        return;
                    }

                    scope.busy = true;
                    var func = scope.$eval(onClick);
                    if (angular.isUndefined(func) || !angular.isObject(func) || !func.hasOwnProperty("then")) {
                        throw new Error("busyButton's ngClick method must return a promise");
                    }
                    func.then(function () {
                        scope.busy = false;
                    });
                };

                if (angular.isDefined(attrs.ngClick)) {
                    attrs.$set('ngClick', functionName + '()');
                }

                //when system isBusy
                scope.$watch(busyCheck, function (newValue) {
                    //add/remove disabled class when no additional clicks are accepted
                    if (newValue === true) {
                        el.addClass('disabled');
                    } else {
                        el.removeClass('disabled');
                    }

                    //update the text
                    if (angular.isDefined(config.busyText) && config.busyText.length > 0) {
                        if (newValue === true) {
                            el.text(config.busyText);
                        } else {
                            el.text(originalText);
                        }
                    }
                });
            }
        };
    });