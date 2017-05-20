/**
 * Created by Aslam on 26/09/16.
 */

'use strict';

function rwbStage() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            stagedata: '='
        },
        templateUrl: 'common/templates/rwb-stage.html',
        link: function(scope, elements, attr) {
            console.log("FormData", scope.stagedata);
        }
    };
};
