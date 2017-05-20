/**
 * Created by Aslam on 26/09/16.
 */

'use strict';

function rtoToggle() {
    return {
        controller: 'PageController',
        restrict: 'E',
        replace: true,
        scope: {
            i: '=',
            field: '=',
            selectvals: '=',
            fields: '=',
            fieldidsuffix: '='
        },
        templateUrl: 'common/templates/rto-toggle.html',
        link: function(scope, elements, attr) {
            scope.selectedValues = [];
            //If the values are set
            scope.$watch(attr.ngModel, function(newVal) {
                scope.fields[scope.field.logical_field_name+scope.fieldidsuffix] = (scope.toggleVal === true) ? scope.getTPSystemValue(1) : scope.getTPSystemValue(0);  
            });

            scope.getTPSystemValue = function (val) {
                if (scope.selectvals !== undefined && scope.selectvals !== null) {
                    return _.where(scope.selectvals, {"CODE_DESC":""+val})[0]['TP_System_Value'];
                } else {
                    return 'N';
                }
            }
        }
    };
};
