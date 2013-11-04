angular.module('angular-form-ui').
    /**
     * <button busy-button busy-text="Saving..." ng-click="save()">Save</button>
     * Required attribute: ng-click="[expression]"
     * Optional attribute: busy-text="[string]"
     */
    directive('busyButton', function () {
        return {
            restrict: 'A',
            priority: -100,
            controller: ['$scope', function ($scope) {
                $scope.busy = false;
                $scope.isBusy = function () {
                    return $scope.busy;
                };
            }],
            link: function (scope, el, attrs) {
                //with click events, handle "busy" status
                var functionName = "cb"+Math.floor(Math.random() * 10001),
                    onClick = attrs.ngClick;

                //wrap onClick so we can enable "busy" status
                scope[functionName] = function () {
                    //if it's already busy, don't accept a new click
                    if (scope.busy === true) {
                        return;
                    }

                    scope.busy = true;
                    var ret = scope.$eval(onClick);
                    if (angular.isDefined(ret) && ret.hasOwnProperty('then')) {
                        ret.then(function () {
                            scope.busy = false;
                        });
                    }
                };

                //handle busy button that uses ngClick
                if (angular.isDefined(attrs.ngClick)) {
                    //by using ngClick instead of .bind(), we're leaving garbage collection up to Angular
                    attrs.$set('ngClick', functionName + '()');
                }

                var config = {
                        busyText: attrs.busyText
                    },
                    originalText;

                //when system isBusy
                scope.$watch('isBusy()', function (newValue) {
                    //add/remove disabled class when no additional clicks are accepted
                    if (newValue === true) {
                        el.addClass('busy');
                    } else {
                        el.removeClass('busy');
                    }

                    //update the text
                    if (angular.isDefined(config.busyText)) {
                        if (newValue === true) {
                            originalText = el.text();
                            el.text(config.busyText);
                        } else {
                            el.text(originalText);
                        }
                    }
                });
            }
        };
    });