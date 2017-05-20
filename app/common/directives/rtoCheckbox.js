/**
 * Created by Aslam on 26/09/16.
 */

'use strict';

function rtoCheckbox() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            i: '=',
            field: '=',
            selectvals: '=',
            fields: '=',
        },
        templateUrl: 'common/templates/rto-checkbox.html',
        link: function(scope, elements, attr) {
            scope.selectedValues = [];
            //If the values are set
            if (scope.fields[scope.field.Logical_Field_Name+'_a_'+(scope.i+1)] !== null && scope.fields[scope.field.Logical_Field_Name+'_a_'+(scope.i+1)] !== undefined) {
                scope.selectedValues = scope.fields[scope.field.Logical_Field_Name+'_a_'+(scope.i+1)].split("|");
            }
            _.each(scope.selectvals, function(item){
                if (_.contains(scope.selectedValues, item.id)) {
                    item.selected = true;
                }
            });

            //Setting the values in the model
            scope.selectItem = function (vals,fields,field,i) {
                if (vals.selected) {
                    vals.selected = false;
                } else {
                    vals.selected = true;
                }
                scope.selectedValues.indexOf(vals.id) === -1 ? scope.selectedValues.push(vals.id) : scope.selectedValues.splice(scope.selectedValues.indexOf(vals.id), 1);
                fields[field.Logical_Field_Name+'_a_'+(i+1)] = scope.selectedValues.toString();
            }

            scope.singleRow = false;
            if (scope.selectvals.length <= 3) {
                scope.singleRow = true;
            }
        }
    };
};
