'use strict';

/**
 * @ngdoc controller
 * @name rtob-form-engine.controller:BasicInformationController
 * @description
 * Basic Information Controller to handle the rtob-form-engine
 *
 * @author Aslam Khan.
 */
function FormRenderer($scope, $rootScope, $http, FormData, ApplicationData, _, LovValue, $fancyModal) {
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
        $scope.loadLovFieldData();

    };

    $scope.openFormData = function() {
        $fancyModal.open({
            templateUrl: 'rtobFormEngine/scripts/partials/saveandhold.html',
            controller: 'SaveController',
            scope: $scope
        });
    };
    $scope.loadLovFieldData = function() {
        $scope.LovData = new LovValue();
        $scope.selectFields = {};
        $scope.LovData.load().then(function(success) {
            $scope.selectFields = success.data;
            //$scope.selectFields = _.groupBy($scope.selectFields, 'Logical_Field_Name');
            $scope.loadFormData();
        });
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

    $scope.random = function() {
        var value = Math.floor(Math.random() * 100 + 1);
        var type;
        if (value < 25) {
            type = 'success';
        } else if (value < 50) {
            type = 'info';
        } else if (value < 75) {
            type = 'warning';
        } else {
            type = 'danger';
        }
        $scope.showWarning = type === 'danger' || type === 'warning';
        //TODO : For Basic Data setting as 5. Recheck the logic
        $rootScope.dynamic = 5;
        $scope.dynamic = 5;
        $scope.type = type;
    };

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

    $scope.openSaveModal = function() {
        $fancyModal.open({
            templateUrl: 'rtobFormEngine/scripts/partials/saveandhold.html',
            controller: 'SaveController'
        });
    };

    //$scope.noOfApplicants = $scope.applicationData.application["total-applicants"];
};
