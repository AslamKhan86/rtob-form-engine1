/**
 * Created by Aslam.
 */

'use strict';

function rtoMultiSelect() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            i: '=',
            field: '=',
            selectvals: '=',
            fields: '=',
            disabled: '='
        },
        templateUrl: 'common/templates/rto-multi-select.html',
        link: function(scope, elements, attr) {
            scope.$on("mobComponentError",function (e,data) {
                scope.mobComponentError = data;
            });
            scope.onSelectCallback = function(item, model, currentField, index, select) {
                console.log("multiselect");
            }
        }
    };
};
