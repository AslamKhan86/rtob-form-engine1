'use strict';

function authenticationMenu() {
  return {
    restrict: 'E',
    templateUrl: 'common/templates/authentication-menu.html',
    scope: {
    	menuClick: "&"
    },
    link: function(scope, element, attrs) {
        if(localStorage.getItem('maxAttemptsReached') !== null) {
            scope.maxAttemptsReached = true;
        }

    }
  }
};
