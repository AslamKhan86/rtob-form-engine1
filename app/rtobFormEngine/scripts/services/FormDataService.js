
/**
 * @ngdoc service
 * @name rwb-ui-rto-forms.service:FormDataService
 * @description
 * Basic Data Model to handle the rwb-ui-rto-forms
 *
 * @author Aslam Khan.
 */

'use strict';

function FormData($http, BASE_URL, $q, _) {

    function FormData(formData) {
        if (formData) {
            this.setData(formData);
        }
        // Some other initializations related to fields
    };

    FormData.prototype = {
        _required: {},

        setData: function(formData) {
            angular.extend(this, formData);
        },
        load: function(id) {
            var scope = this;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'common/mock/formdata_v4.0.json'
            }).then(function(success) {
                deferred.resolve(success);
                scope.setData(success.data.formData.data.sections[0].fields);
                var required = success.data.formData.data.sections[0].fields.filter(function(data,index) {
                    if(data['Mandatory']=='Yes'){
                      scope._required[data.LOV_Field_Name]=data.Logical_Field_Name;
                    }
                });
            }, function(error) {
                //Error Message
            });
            return deferred.promise;
        }
    };
    return FormData;
};
