angular.module('angular-form-ui').
    /**
     * <check-box ng-model="isChecked()"></check-box>
     * Required attribute: ng-model="[expression]"
     */
    directive('checkBox', function () {
        return {
            replace: true,
            restrict: 'E',
            //require: '^ngModel',
            scope: {
                'externalValue': '=ngModel',
                'value': '&'
            },
            template: function (el, attrs) {
                var html =
                    '<div class="ngCheckBox">'+
                        '<span ng-class="{checked: isChecked}">' +
                            '<input type="checkbox" ng-model="isChecked"/>'+
                        '</span>'+
                    '</div>';
                return html;
            },
            controller: ['$scope', '$timeout', function ($scope, $timeout) {
                var initialized = false;

                if (angular.isArray($scope.externalValue)) {
                    $scope.isChecked = $scope.externalValue.indexOf($scope.value()) > 0;
                } else {
                    $scope.isChecked = !!$scope.externalValue;
                }

                $scope.$watch('isChecked', function (newValue) {
                    if (angular.isDefined(newValue)) {
                        //add or remove items if this is an array
                        if (angular.isArray($scope.externalValue)) {
                            var index = $scope.externalValue.indexOf($scope.value());
                            if(index > -1) {
                                //delete $scope.externalValue[$scope.value()];
                                $scope.externalValue.splice(index, 1);
                            } else if (initialized) {
                                //$scope.externalValue[$scope.value()] = null;
                                $scope.externalValue.push($scope.value());
                            }
                        } else {
                            //simple boolean value
                            $scope.externalValue = newValue;
                        }
                        if (initialized)
                            console.log($scope.externalValue);
                    }
                });

                $timeout(function () {
                    initialized = true;
                });
            }]
        };
    });