/*! angular-form-ui v0.3.1 | https://github.com/bkuhl/angular-form-ui */
/*global angular */

angular.module('angular-form-ui', []);
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
angular.module('angular-form-ui').
    /**
     * <check-box ng-model="isChecked()"></check-box>
     * Required attribute: ng-model="[expression]"
     * Optional attribute: value="[expression]"
     */
    directive('checkBox', function () {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                'externalValue': '=ngModel',
                'value': '&'
            },
            template: function (el, attrs) {
                var html = '<div class="ngCheckBox' + ((angular.isDefined(attrs.class)) ? ' class="'+attrs.class+'"' : '') + '">'+
                    '<span ng-class="{checked: isChecked}">' +
                        '<input type="checkbox" ng-model="isChecked"' + ((angular.isDefined(attrs.id)) ? ' id="'+attrs.id+'"' : '') + '' + ((angular.isDefined(attrs.name)) ? ' name="'+attrs.name+'"' : '') + '' + ((angular.isDefined(attrs.required)) ? ' name="'+attrs.required+'"' : '') + '/>'+
                    '</span>'+
                '</div>';
                return html;
            },
            controller: ['$scope', function ($scope) {
                if (angular.isArray($scope.externalValue)) {
                    $scope.isChecked = $scope.externalValue.indexOf($scope.value()) >= 0;
                } else {
                    $scope.isChecked = !!$scope.externalValue;
                }

                $scope.$watch('isChecked', function (newValue, oldValue) {
                    if (angular.isDefined(newValue) && angular.isDefined(oldValue)) {
                        //add or remove items if this is an array
                        if (angular.isArray($scope.externalValue)) {
                            var index = $scope.externalValue.indexOf($scope.value());
                            if(newValue) {
                                if( index < 0 ) $scope.externalValue.push($scope.value());
                            } else {
                                if( index >= 0 ) $scope.externalValue.splice(index, 1);
                            }
                        } else {
                            //simple boolean value
                            $scope.externalValue = newValue;
                        }
                    }
                });
            }]
        };
    });
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
angular.module('angular-form-ui').
    /**
     * <select-box ng-model="model.property" options="models" opt-exp="t.name for t in options"></select-box>
     * Required attribute: ng-model="[expression]"
     * Required attribute: opt-exp="[comprehension_expression]"
     * Optional attribute: name="xxxx"
     * Optional attribute: label="xxxx" (used if ng-model is undefined or null)
     */
    directive('selectBox', function () {
        return {
            replace: true,
            restrict: 'E',
            scope: false,
            template: function (el, attrs) {
                if (!angular.isDefined(attrs.label)) {
                    attrs.label = "";
                }
                if (!angular.isDefined(attrs.optExp)) {
                    throw new Error("A comprehension expression must be defined with the attribute optExp for selectBox");
                }
                var html = '<div class="ngSelectBox' + ((angular.isDefined(attrs.class)) ? ' ' + attrs.class : '') + '">'+
                    '<span>{{ "' + attrs.label + '" }}</span>'+
                        '<select ng-model="' + attrs.ngModel + '" ng-options="' + attrs.optExp + '"' + ((attrs.required) ? ' required' : '') + '' + ((angular.isDefined(attrs.id)) ? ' id="'+attrs.id+'"' : '') + '' + ((attrs.name) ? ' name="' + attrs.name + '"' : '') + '></select>'+
                    '</div>';
                return html;
            },
            link: function (scope, el, attrs) {
                scope.$watch(attrs.ngModel, function () {
                    var select = el[0].children[1];
                    //when value changes, update the selectBox text)
                    if (angular.isElement(el[0].firstChild) && angular.isDefined(select.options[select.selectedIndex]) && select.selectedIndex > 0) {
                        el[0].firstChild.innerText = select.options[select.selectedIndex].outerText;
                    }
                });
            }
        };
    });
angular.module('angular-form-ui').
/**
 * <slide-toggle ng-model="[expression]"></slide-toggle>
 * Required attribute: ng-model="[expression]"
 * Optional attribute: on-label="xxxx" (defaults to "On")
 * Optional attribute: off-label="xxxx" (defaults to "Off")
 * Optional attribute: on="function"
 * Optional attribute: off="function"
 * Optional attribute: disable-triggers-on-init
 */
    directive('slideToggle', ['$timeout', function ($timeout) {
        return {
            replace: true,
            restrict: 'E',
            scope: false,
            require: '^ngModel',
            template: function (el, attrs) {
                attrs = angular.extend({
                    onLabel: "On",
                    offLabel: "Off"
                }, attrs);

                var html =
                    '<div class="ngSlideToggle"' + ((angular.isDefined(attrs.class)) ? ' class="'+attrs.class+'"' : '') + ' ng-class="attrs.ngModel ? \'on\' : \'off\'">'+
                        '<input type="checkbox" ng-model="' + attrs.ngModel + '"' + ((angular.isDefined(attrs.id)) ? ' id="'+attrs.id+'"' : '') + '' + ((angular.isDefined(attrs.name)) ? ' name="'+attrs.name+'"' : '') + '/>' +
                        '<div class="stSlide">'+
                            '<span class="stOn">' + attrs.onLabel + '</span>'+
                            '<span class="stHandle">| | |</span>'+
                            '<span class="stOff">' + attrs.offLabel + '</span>'+
                        '</div>'+
                    '</div>';
                return html;
            },
            link: function (scope, el, attrs, ctrl) {
                var
                    initialized = false,
                    container = el[0],
                    slide,
                    onLabel,
                    handle,
                    offLabel,
                    labelWidth, //the width of both labels
                    disableTriggersOnInit = angular.isDefined(attrs.disableTriggersOnInit),
                    on = function (skipOnFunc) {
                        if (initialized === true && angular.isDefined(attrs.on) && (angular.isUndefined(skipOnFunc) || skipOnFunc !== true)) {
                            var onFunc = scope.$eval(attrs.on);
                            if (angular.isFunction(onFunc)) {
                                onFunc();
                            }
                        }
                        slide.style.marginLeft = "0px";
                    },
                    off = function (skipOffFunc) {
                        if (initialized === true && angular.isDefined(attrs.off) && (angular.isUndefined(skipOffFunc) || skipOffFunc !== true)) {
                            var offFunc = scope.$eval(attrs.off);
                            if (angular.isFunction(offFunc)) {
                                offFunc();
                            }
                        }
                        slide.style.marginLeft = "-" + (labelWidth + 1) + "px";
                    };

                //toggle the value when clicked
                el.bind('click', function () {
                    scope.$apply(function () {
                        var newValue = !ctrl.$viewValue;

                        //if not watching the model value, we should trigger these when the user clicks, otherwise $watch will do it
                        if (disableTriggersOnInit) {
                            if (newValue) {
                                on();
                            } else {
                                off();
                            }
                        }

                        ctrl.$setViewValue(newValue);
                    });
                });

                //use timeout trick to be sure code isn't executed till dom is ready
                $timeout(function() {
                    slide = container.childNodes[1];
                    onLabel = slide.childNodes[0];
                    handle = slide.childNodes[1];
                    offLabel = slide.childNodes[2];

                    //get the X padding of an element so we set the width correctly
                    var getXPadding = function (label) {
                        var computedStyle = window.getComputedStyle(label),
                            left = parseInt(computedStyle.paddingLeft.replace('px', ''), 10),
                            right = parseInt(computedStyle.paddingRight.replace('px', ''), 10);
                        return left + right;
                    };

                    //set initial value - disable transitions initially so there's no animation
                    var transitionCache = window.getComputedStyle(slide).transition;
                    slide.style.transition = '';

                    //update the width of the shorter label so both labels are the same
                    if (onLabel.clientWidth > offLabel.clientWidth) {
                        labelWidth = onLabel.clientWidth;
                        offLabel.style.width = (labelWidth - getXPadding(onLabel)) + 'px';
                    } else if (offLabel.clientWidth > onLabel.clientWidth) {
                        labelWidth = offLabel.clientWidth;
                        onLabel.style.width = (labelWidth - getXPadding(offLabel)) + 'px';
                    }

                    //set the triggers based on view value - only if we're watching the value
                    if (ctrl.$viewValue) {
                        on();
                    } else {
                        off();
                    }

                    //adjust main container to be wide enough for the handle and 1 label
                    container.style.width = (handle.clientWidth + onLabel.clientWidth + 3) + 'px';

                    //be sure the slide is wider than the container
                    slide.style.width = (onLabel.clientWidth + handle.clientWidth + offLabel.clientWidth + 4) + 'px';
                    container.style.visibility = "visible";
                    slide.style.transition = transitionCache;

                    //change button when value changes
                    initialized = true;
                    scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                        if (newValue) {
                            on(disableTriggersOnInit);
                        } else {
                            off(disableTriggersOnInit);
                        }
                    });
                });
            }
        };
    }]);