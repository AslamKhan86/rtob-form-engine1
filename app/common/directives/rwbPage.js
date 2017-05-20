/**
 * Created by Aslam on 26/09/16.
 */

'use strict';

function rwbPage() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            pagedata: '='
        },
        templateUrl: 'common/templates/rwb-page.html',
        link: function(scope, elements, attr) {
            console.log("FormData", scope.pagedata);
        }
    };
};
