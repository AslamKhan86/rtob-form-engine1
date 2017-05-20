/**
 * Created by Aslam on 26/09/16.
 */

'use strict';

function rwbForm() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            formdata: '=',
            popup: '='
        },
        templateUrl: 'common/templates/rwb-form.html',
        link: function(scope, elements, attr) {
            console.log("FormData", scope.popup);
        }
    };
};
