/**
 * @ngdoc service
 * @name rtob-form-engine.controller:BasicDataService
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
        // Some other initializations related to book
    };
    ApplicationData.prototype = {
        setData: function(applicationdata) {
            angular.extend(this, applicationdata);
        },
        _applicantData: {},
        setApplicant: function(basicData, applicationData, total_applicants) {
            for (var n = 0; n < total_applicants; n++) {
                _.each(basicData, function(item, index, list) {
                    applicationData.applicant[item['Logical_Field_Name']+"_a_"+(n+1)] = "";
                });
            }
            return applicationData;
        },
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
