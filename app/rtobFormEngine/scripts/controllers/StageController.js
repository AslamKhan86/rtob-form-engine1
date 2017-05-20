'use strict';

function StageController($scope, AddressData, $rootScope, _, LovValue, MandatoryCheck, StageData, PageData) {
    /**
     * @Constructor
     * @description
     * Call the necessary initial loading like form
     * rendering and Lov fields.
     */
    $scope.init = function() {
        $scope.templateName = "rtobFormEngine/scripts/partials/page-renderer.html";
        $scope.mandatory = new MandatoryCheck();
        $scope.LovData = new LovValue();
        $scope.visibility = {};
        $rootScope.group = [{
            "open": true
        }, {
            "open": false
        }, {
            "open": false
        }, {
            "open": false
        }];
        //$scope.loadFormData();


        //TODO: Remove Regular Expression logic. Should come from Form Config
        /*_.each($scope.addressData, function(item, index, list) {
            if (list[index]['type'] == 'Numeric') {
                item['regexp'] = "^[0-9]+$";
            }
        });*/
        $scope.visibility = {
            "business_establishment_date_a_1": true,
            "ownership_type_a_1": true,
            "incorporation_country_a_1": true,
            "incorporation_date_a_1": true,
            "percentage_of_share_holding_a_1": true,
            "business_establishment_date_a_2": true,
            "ownership_type_a_2": true,
            "incorporation_country_a_2": true,
            "incorporation_date_a_2": true,
            "percentage_of_share_holding_a_2": true,
            "business_establishment_date_a_3": true,
            "ownership_type_a_3": true,
            "incorporation_country_a_3": true,
            "incorporation_date_a_3": true,
            "percentage_of_share_holding_a_3": true,
            "business_establishment_date_a_4": true,
            "ownership_type_a_4": true,
            "incorporation_country_a_4": true,
            "incorporation_date_a_4": true,
            "percentage_of_share_holding_a_4": true,
        };
        $scope.loadLovFieldData();
    };



    $scope.$watch(function() {
        return $rootScope.stageId
    }, function() {
        $scope.stageFields = StageData.getStageFields();
        $scope.stageName = StageData.getStageName();
    });

    $scope.$watch(function() {
        return $rootScope.pageId
    }, function() {
        $scope.stageFields = _.sortBy($scope.stageFields, 'rwb_category');
        var stageFieldsGroup = _.groupBy($scope.stageFields, 'rwb_category');
        PageData.setPageId($scope.$parent.applicationData.stage.page_id);
        PageData.setPageData(stageFieldsGroup[$scope.$parent.applicationData.stage.page_id]);
        $scope.pageFields = PageData.getPageFields();
        $scope.products = $scope.$parent.applicationData.products;
        $scope.applicantSpecific = PageData.getApplicantSpecific();
        $scope.onlyApplicantSpecific = PageData.getOnlyApplicantSpecific();
        $scope.onlyApplicantSpecificGroups = _.groupBy($scope.onlyApplicantSpecific, 'field_set_name');

        $scope.applicantProductSpecific = PageData.getApplicantProductSpecific();
        $scope.onlyProductSpecific = PageData.getOnlyProductSpecific();
        $scope.applicationSpecific = PageData.getApplicationSpecific();
    });
    /**
     * @method loadFormData
     * @description
     * Load the form data which is responsible for getting
     * rendered in the UI also group it by RWB_category
     */
    /*$scope.loadFormData = function () {
        $scope.addressDataFields.load().then(function (success) {
            $scope.mandatory.__mandatoryFields = $scope.addressDataFields._required;
            $scope.mandatory.__isValid('ad-4');
            $scope.addressData = _.sortBy($scope.addressDataFields, 'RWB_Category');
            $scope.addressDataGroups = _.groupBy($scope.addressData, 'RWB_Category');
            _.each($scope.addressData, function(item, index, list) {
                if (list[index]['Type'] == 'Numeric') {
                    item['regexp'] = "^[0-9]+$";
                }
            });
            $scope.visibility = {
                "business_establishment_date_a_1": true,
                "ownership_type_a_1": true,
                "incorporation_country_a_1": true,
                "incorporation_date_a_1": true,
                "percentage_of_share_holding_a_1":true,
                "business_establishment_date_a_2": true,
                "ownership_type_a_2": true,
                "incorporation_country_a_2": true,
                "incorporation_date_a_2": true,
                "percentage_of_share_holding_a_2":true,
                "business_establishment_date_a_3": true,
                "ownership_type_a_3": true,
                "incorporation_country_a_3": true,
                "incorporation_date_a_3": true,
                "percentage_of_share_holding_a_3":true,
                "business_establishment_date_a_4": true,
                "ownership_type_a_4": true,
                "incorporation_country_a_4": true,
                "incorporation_date_a_4": true,
                "percentage_of_share_holding_a_4":true,
            };
        });
    };*/

    /**
     * @method loadLovFieldData
     * @description
     * Load the form lov fields which is responsible for getting
     * rendered in the UI also group it by Logical_Field_Name
     */
    $scope.loadLovFieldData = function() {
        $scope.selectFields = {};
        $scope.LovData.load().then(function(success) {
            $scope.selectFields = success.data;
            $scope.selectFields = _.groupBy($scope.selectFields, 'Logical_Field_Name');
        });
    };

    /**
     * @method range
     * @description
     * Set the dynamic progress bar value range
     */

    $scope.range = function(count) {
        var ratings = [];
        for (var i = 0; i < count; i++) {
            ratings.push(i);
        }
        return ratings;
    };

    /*$scope.submitData = function() {
        if ($scope.$child.__isMandatoryFields()) {
            return false;
            //$scope.__submitApplicantDetails();
        }else {
            $scope.__submitApplicantDetails();
      }
    };*/

    $scope.__isMandatoryFields = function() {
        var required = $scope.mandatory.__submitStageData;
        var applicant = $scope.applicationData.applicants;
        var total_applicant = $scope.applicationData.application.total_applicants;
        var error = false;
        var regex;
        var i;
        if ($rootScope.flag <= total_applicant) {
            for (i = 1; i <= total_applicant; i++) {
                _.each(required, function(required, index) {
                    $scope.error[required + '_a_' + i] = false;
                    if (applicant[required + '_a_' + i] === '' || applicant[required + '_a_' + i] === null) {
                        $scope.error[required + '_a_' + i] = true;
                    }
                    //Conditional Mandatory Fields goes here
                    if (total_applicant > 1) {
                        $scope.error['nature_of_relationship_a_' + i] = false;
                        if (applicant['nature_of_relationship_a_' + i] == '' || applicant['nature_of_relationship_a_' + i] == null) {
                            $scope.error['nature_of_relationship_a_' + i] = true;
                        }
                    }
                    //Client work type
                    if (applicant['client_work_type_a_' + i] === 'SE' || applicant['client_work_type_a_' + i] === 'S') {
                        $scope.error['company_name_a_' + i] = false;
                        $scope.error['position_designation_a_' + i] = false;
                        $scope.error['years_months_in_current_organization_a_' + i] = false;
                        $scope.error['years_months_in_previous_organization_a_' + i] = false;
                        $scope.error['total_work_experience_a_' + i] = false;


                        if (applicant['company_name_a_' + i] == '' || applicant['company_name_a_' + i] == null) {
                            $scope.error['company_name_a_' + i] = true;
                        }
                        if (applicant['position_designation_a_' + i] == '' || applicant['position_designation_a_' + i] == null) {
                            $scope.error['position_designation_a_' + i] = true;
                        }
                        if (applicant['years_months_in_current_organization_a_' + i] == '' || applicant['years_months_in_current_organization_a_' + i] == null) {
                            $scope.error['years_months_in_current_organization_a_' + i] = true;
                        }
                        if (applicant['years_months_in_previous_organization_a_' + i] == '' || applicant['years_months_in_previous_organization_a_' + i] == null) {
                            $scope.error['years_months_in_previous_organization_a_' + i] = true;
                        }
                        if (applicant['total_work_experience_a_' + i] == '' || applicant['total_work_experience_a_' + i] == null) {
                            $scope.error['total_work_experience_a_' + i] = true;
                        }
                    } else {
                        $scope.error['company_name_a_' + i] = false;
                        $scope.error['position_designation_a_' + i] = false;
                        $scope.error['years_months_in_current_organization_a_' + i] = false;
                        $scope.error['years_months_in_previous_organization_a_' + i] = false;
                    }

                    //company type
                    if (applicant['company_name_a_' + i] != '' && applicant['company_name_a_' + i] != null) {
                        $scope.error['company_type_a_' + i] = false;
                        if (applicant['company_type_a_' + i] == '' || applicant['company_type_a_' + i] == null) {
                            $scope.error['company_type_a_' + i] = true;
                        }
                    } else {
                        $scope.error['company_type_a_' + i] = false;
                    }

                    //ownership type
                    if (applicant['ownership_type_a_' + i] === "P") {
                        $scope.error['percentage_of_share_holding_a_' + i] = false;
                        if (applicant['percentage_of_share_holding_a_' + i] == '' || applicant['percentage_of_share_holding_a_' + i] == null) {
                            $scope.error['percentage_of_share_holding_a_' + i] = true;
                        }
                    } else {
                        $scope.error['percentage_of_share_holding_a_' + i] = false;
                    }
                });
            }

        }
        _.each($scope.error, function(item, index) {
            if (item == true) {
                error = true;
            }
        });
        return error;
    };
}