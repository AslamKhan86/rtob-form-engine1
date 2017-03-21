'use strict';

/**
 * @ngdoc controller
 * @name rtob-form-engine.controller:BasicInformationController
 * @description
 * Basic Information Controller to handle the rtob-form-engine
 *
 * @author Aslam Khan.
 */
function FormRenderer($scope, $rootScope, $http, FormData, ApplicationData, _, LovValue) {
    // Controller Init
    $scope.init = function() {
        $scope.formData = new FormData();
        $scope.formData.load().then(function(success) {      
            _.each($scope.formData, function(item, index, list) {
                list[index]['Seq_No'] = new Number(item['Seq_No']);
                list[index]['Positioning'] = new Number(item['Positioning']);
                if (list[index]['Logical_Field_Name'] == 'email') {
                    item['isEmail'] = true;
                } else {
                    item['isEmail'] = false;
                }
            });
            $scope.formData = _.sortBy($scope.formData, 'Seq_No');
        });
        var LovData = LovValue.getLovValue().then(function(response) {
            $scope.getOptions = function(id) {
                var lovValues = response.data.filter(function(lov) {
                    if (lov["Logical Field Name"] === id) {
                        return lov;
                    }
                });
                return lovValues;
            };
        });
        $scope.getOptions = {};
    };
    $scope.error = $scope.$parent.error;
    $scope.submitFormData = function() {
        var data = $scope.applicationData;
        console.log(data);
        $http({
            method: 'POST',
            url: 'http://0.0.0.0:3000/pii/submitFormData',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    //Number as a ng-repeat
    $scope.range = function(count) {
        var ratings = [];
        for (var i = 0; i < count; i++) {
            ratings.push(i);
        }
        return ratings;
    }

    $scope.oneAtATime = true;

    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };
    $rootScope.group = [{
            "open": true
        },
        {
            "open": false
        },
        {
            "open": false
        },
        {
            "open": false
        }
    ];

    //$scope.noOfApplicants = $scope.applicationData.application["total-applicants"];
};
