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