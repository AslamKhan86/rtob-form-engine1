/**
 * @ngdoc service
 * @name rtob-form-engine.service:ApplicationDataService
 * @description
 * Basic Data Model to handle the rtob-form-engine
 *
 * @author Aslam Khan.
 */

'use strict';

function ApplicationData($http, BASE_URL, $q, _) {
    function ApplicationData(applicationdata) {
        if (applicationdata) {
            this.setData(applicationdata);
        }
        // Some other initializations related to application
    };
    ApplicationData.prototype = {
        setData: function(applicationdata) {
            angular.extend(this, applicationdata);
        },
        _appData:{},
        load: function(id) {
            var scope = this;
            var deferred = $q.defer();
            $http.get('common/mock/applicationdata_4.json')
                .then(function(success) {
                    deferred.resolve(success);
                    scope.setData(success.data.applicationdata);
                }), (function() {

                });
            return deferred.promise;
        }
    };
    return ApplicationData;
};
