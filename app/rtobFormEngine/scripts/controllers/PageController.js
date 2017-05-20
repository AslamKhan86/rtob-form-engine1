'use strict';

function PageController($scope, AddressData, $rootScope, _, LovValue, MandatoryCheck, PageData) {
    /**
     * @Constructor
     * @description
     * Call the necessary initial loading like form
     * rendering and Lov fields.
     */
    $scope.init = function() {
        $scope.applicantTemplateName = "rtobFormEngine/scripts/partials/applicant-field-renderer.html";
        $scope.productTemplateName = "rtobFormEngine/scripts/partials/product-field-renderer.html";
        $scope.applicationTemplateName = "rtobFormEngine/scripts/partials/application-field-renderer.html";
        $scope.productFields = {};
        //$scope.pageId = PageData.getPageId();
        $scope.addressDataFields = new AddressData();
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
        $scope.mandatory.__mandatoryFields = PageData._required;
        $scope.mandatory.__isValid(PageData.getPageId());
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
            "per_address_line_1_a_1": false
        };
        $scope.loadLovFieldData();
    };

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

    $scope.convertKey = function(val) {
        return "rcw_" + val.toLowerCase();
    }

    $scope.getProductFieldFor = function(cat, joint) {
        $scope.productFields = _.filter(PageData.getPageData(), function(item) {
            return (item.joint === joint && item.product_specific === "Yes" && item["rcw_" + cat.toLowerCase()] === "Y");
        });
        return $scope.productFields;
    }

    $scope.increment = function(val) {
        $scope.count = val + 1;
    }
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

    $scope.submitData = function() {
        if ($scope.__isMandatoryFields()) {
            return false;
            //$scope.__submitApplicantDetails();
        } else {
            $scope.__submitApplicantDetails();
        }
    };

    $scope.showFields = function(evt) {
        var id = event.target.id;
        var logicalName = (id) ? event.target.id : event.target.parentElement.id;
        var logicalFieldName = logicalName.substring(0, logicalName.lastIndexOf("_a_"));
        var fieldName = logicalName; //With _a_
        var currentApplicant = logicalName.substring(logicalName.length, logicalName.lastIndexOf("_a_")).split("_a_")[1]; //With out  _a_
        $scope.conditionalPresence(logicalFieldName, currentApplicant, $scope.fields[fieldName]);
    };

    $scope.conditionalPresence = function(logicalFieldName, currentApplicant, visibility) {
        var conditionalPrecenceFields;
        if (logicalFieldName === "same_as_residential_address") {
            conditionalPrecenceFields = ["per_address_line_1", "per_address_line_2", "per_address_line_3", "per_postal_zip_code", "per_city", "per_state", "per_country"];
        } else if(logicalFieldName === "confirm_pan_number_declared"){
            conditionalPrecenceFields =["crs_comments","crs_reason_code"];
        } else if(logicalFieldName === "are_you_a_tax_resident_of_india"){
            conditionalPrecenceFields =["country_of_tax_residence_1","tax_id_no_1",
                "crs_reason_code_1","crs_comments_1","country_of_tax_residence_2","tax_id_no_2","crs_reason_code_2","crs_comments_2",
                "country_of_tax_residence_3","tax_id_no_3","crs_reason_code_3","crs_comments_3","country_of_tax_residence_4",
                "tax_id_no_4","crs_reason_code_4","crs_comments_4"];
        }
        _.each(conditionalPrecenceFields, function(val, key) {
            var r = val + '_a_' + currentApplicant;
            $scope.fields[r] = null;
            $scope.$parent.error[r] = false;
            angular.element(document).find("#" + r).next().removeClass("colorBlue");
            $scope.$parent.visibility[r] = (visibility === "N") ? true : false;
        });
    };

    $scope.conditionalMandatoryForDeclaration = function(applicant, i) {
        if(applicant['confirm_pan_number_declared_a_' + i] === "N") {
            //Derived fields
            if (applicant['crs_reason_code_a_' + i] === null) {
                $scope.error['crs_reason_code_a_' + i] = true;
            } else {
                $scope.error['crs_reason_code_a_' + i] = false;
            }
            if (applicant['crs_reason_code_a_' + i] === "B00" && applicant['crs_comments_a_' + i] === null) {
                $scope.error['crs_comments_a_' + i] = true;
            } else {
                $scope.error['crs_comments_a_' + i] = false;
            }
        }
        if(applicant['are_you_a_tax_resident_of_india_a_' + i] === "N"){
            for(var j=1;j<=4;j++) {
                if(j=== 1) {
                    $scope.invokeConditionalFields(applicant,j,i);
                }
                if(j=== 2 && (applicant['country_of_tax_residence_3_a_' + i] !== null || applicant['country_of_tax_residence_4_a_' + i] !== null || applicant['tax_id_no_2_a_' + i] !== null || applicant['crs_reason_code_2_a_' + i] !== null)) {
                    $scope.invokeConditionalFields(applicant,j,i);
                }
                if(j=== 3 && (applicant['country_of_tax_residence_4_a_' + i] !== null || applicant['tax_id_no_3_a_' + i] !== null || applicant['crs_reason_code_3_a_' + i] !== null)) {
                    $scope.invokeConditionalFields(applicant,j,i);
                }
                if(j=== 4 && (applicant['tax_id_no_4_a_' + i] !== null || applicant['crs_reason_code_4_a_' + i] !== null)) {
                    $scope.invokeConditionalFields(applicant,j,i);
                }
            }
        }
    };

    $scope.invokeConditionalFields = function (applicant,j,i){


        //Set fields
        if (applicant['country_of_tax_residence_' + j + '_a_' + i] === null) {
            $scope.error['country_of_tax_residence_' + j + '_a_' + i] = true;
        }else{
            $scope.error['country_of_tax_residence_' + j + '_a_' + i] = false;
        }
        if (applicant['tax_id_no_' + j + '_a_' + i] !== null && applicant['crs_reason_code_' + j + '_a_' + i] !== null && applicant['crs_reason_code_' + j + '_a_' + i] !== undefined) {
            $scope.error['tax_id_no_' + j + '_a_' + i] = false;
            $scope.error['crs_reason_code_' + j + '_a_' + i] = false;
        }
        if (applicant['tax_id_no_' + j + '_a_' + i] === null && applicant['crs_reason_code_' + j + '_a_' + i] === null) {
            $scope.error['tax_id_no_' + j + '_a_' + i] = true;
            $scope.error['crs_reason_code_' + j + '_a_' + i] = true;
        }
        if (applicant['tax_id_no_' + j + '_a_' + i] !== null && applicant['crs_reason_code_' + j + '_a_' + i] === null) {
            $scope.error['tax_id_no_' + j + '_a_' + i] = false;
            $scope.error['crs_reason_code_' + j + '_a_' + i] = false;
        }
        if (applicant['tax_id_no_' + j + '_a_' + i] === null && applicant['crs_reason_code_' + j + '_a_' + i] !== null && applicant['crs_reason_code_' + j + '_a_' + i] !== undefined) {
            $scope.error['tax_id_no_' + j + '_a_' + i] = false;
            $scope.error['crs_reason_code_' + j + '_a_' + i] = false;
        }

        //Comments section
        if (applicant['crs_reason_code_' + j + '_a_' + i] === "B00" && applicant['crs_comments_' + j + '_a_' + i] === null) {
            $scope.error['crs_comments_' + j + '_a_' + i] = true;
        } else {
            $scope.error['crs_comments_' + j + '_a_' + i] = false;
        }

    };

    $scope.conditionalMandatoryForAddress = function(applicant, i) {
        var regex;
        //conditional validation - RES country is IN
        if (applicant['res_country' + '_a_' + i] === "IN") {
            regex = new RegExp("^[0-9]{6}$");
            $scope.error['res_state' + '_a_' + i] = false;
            $scope.error['res_postal_zip_code' + '_a_' + i] = false;
            if (applicant['res_state' + '_a_' + i] == null) {
                $scope.error['res_state' + '_a_' + i] = true;
            }
            if (applicant['res_postal_zip_code' + '_a_' + i] == null || regex.test(applicant['res_postal_zip_code' + '_a_' + i]) == false) {
                $scope.error['res_postal_zip_code' + '_a_' + i] = true;
                $scope.errorMsg = 'Pan number is Invalid';
            }
        } else {
            $scope.error['res_state' + '_a_' + i] = false;
            $scope.error['res_postal_zip_code' + '_a_' + i] = false;
        }

        //conditional validation - Office country is IN
        if (applicant['off_country' + '_a_' + i] === "IN") {
            $scope.error['off_state' + '_a_' + i] = false;
            $scope.error['off_postal_zip_code' + '_a_' + i] = false;
            if (applicant['off_state' + '_a_' + i] == null) {
                $scope.error['off_state' + '_a_' + i] = true;
            }
            if (applicant['off_postal_zip_code' + '_a_' + i] == null) {
                $scope.error['off_postal_zip_code' + '_a_' + i] = true;
            }
        } else {
            $scope.error['off_state' + '_a_' + i] = false;
            $scope.error['off_postal_zip_code' + '_a_' + i] = false;
        }

        //conditional validation - Office country is IN
        if (applicant['per_country' + '_a_' + i] === "IN") {
            $scope.error['per_state' + '_a_' + i] = false;
            $scope.error['per_postal_zip_code' + '_a_' + i] = false;
            if (applicant['per_state' + '_a_' + i] == null) {
                $scope.error['per_state' + '_a_' + i] = true;
            }
            if (applicant['per_postal_zip_code' + '_a_' + i] == null) {
                $scope.error['per_postal_zip_code' + '_a_' + i] = true;
            }
        } else {
            $scope.error['per_state' + '_a_' + i] = false;
            $scope.error['per_postal_zip_code' + '_a_' + i] = false;
        }

        //same_as_residential_address False && applicant['mailing_address'+ '_a_' + i] =="P"
        if (applicant['same_as_residential_address' + '_a_' + i] === 'N' && applicant['mailing_address' + '_a_' + i] == "P") {
            $scope.error['per_address_line_1' + '_a_' + i] = false;
            $scope.error['per_country' + '_a_' + i] = false;
            $scope.error['per_city' + '_a_' + i] = false;
            if (applicant['per_address_line_1' + '_a_' + i] == null) {
                $scope.error['per_address_line_1' + '_a_' + i] = true;
            } else {
                $scope.error['per_address_line_1' + '_a_' + i] = false;
            }
            if (applicant['per_country' + '_a_' + i] == null) {
                $scope.error['per_country' + '_a_' + i] = true;
            } else {
                $scope.error['per_country' + '_a_' + i] = false;
            }
            if (applicant['per_city' + '_a_' + i] == null) {
                $scope.error['per_city' + '_a_' + i] = true;
            } else {
                $scope.error['per_city' + '_a_' + i] = false;
            }

        }

        //Same as residential address is false
        if (applicant['same_as_residential_address' + '_a_' + i] == false && applicant['mailing_address' + '_a_' + i] !== "P") {
            $scope.error['per_address_line_1' + '_a_' + i] = false;
            $scope.error['per_country' + '_a_' + i] = false;
            $scope.error['per_city' + '_a_' + i] = false;

            if (applicant['per_address_line_2' + '_a_' + i] !== null ||
                applicant['per_address_line_3' + '_a_' + i] !== null ||
                applicant['per_postal_zip_code' + '_a_' + i] !== null ||
                applicant['per_city' + '_a_' + i] !== null ||
                applicant['per_country' + '_a_' + i] !== null ||
                applicant['per_state' + '_a_' + i] !== null) {
                $scope.error['per_address_line_1' + '_a_' + i] = true;
            } else {
                $scope.error['per_address_line_1' + '_a_' + i] = false;
            }

            if (applicant['per_address_line_2' + '_a_' + i] !== null ||
                applicant['per_address_line_3' + '_a_' + i] !== null ||
                applicant['per_postal_zip_code' + '_a_' + i] !== null ||
                applicant['per_address_line_1' + '_a_' + i] !== null ||
                applicant['per_country' + '_a_' + i] !== null ||
                applicant['per_state' + '_a_' + i] !== null) {
                $scope.error['per_city' + '_a_' + i] = true;
            } else {
                $scope.error['per_city' + '_a_' + i] = false;
            }

            if (applicant['per_address_line_2' + '_a_' + i] !== null ||
                applicant['per_address_line_3' + '_a_' + i] !== null ||
                applicant['per_postal_zip_code' + '_a_' + i] !== null ||
                applicant['per_address_line_1' + '_a_' + i] !== null ||
                applicant['per_city' + '_a_' + i] !== null ||
                applicant['per_state' + '_a_' + i] !== null) {
                $scope.error['per_country' + '_a_' + i] = true;
            } else {
                $scope.error['per_country' + '_a_' + i] = false;
            }
        }

        //Office address validation
        if (applicant['mailing_address' + '_a_' + i] == "O") {
            $scope.error['off_address_line_1' + '_a_' + i] = false;
            $scope.error['off_country' + '_a_' + i] = false;
            $scope.error['off_city' + '_a_' + i] = false;
            if (applicant['off_address_line_1' + '_a_' + i] == null) {
                $scope.error['off_address_line_1' + '_a_' + i] = true;
            } else {
                $scope.error['off_address_line_1' + '_a_' + i] = false;
            }
            if (applicant['off_country' + '_a_' + i] == null) {
                $scope.error['off_country' + '_a_' + i] = true;
            } else {
                $scope.error['off_country' + '_a_' + i] = false;
            }
            if (applicant['off_city' + '_a_' + i] == null) {
                $scope.error['off_city' + '_a_' + i] = true;
            } else {
                $scope.error['off_city' + '_a_' + i] = false;
            }

        }

        //Office address validation
        if (applicant['mailing_address' + '_a_' + i] !== "O") {
            $scope.error['off_address_line_1' + '_a_' + i] = false;
            $scope.error['off_country' + '_a_' + i] = false;
            $scope.error['off_city' + '_a_' + i] = false;

            if (applicant['off_address_line_2' + '_a_' + i] !== null ||
                applicant['off_address_line_3' + '_a_' + i] !== null ||
                applicant['off_postal_zip_code' + '_a_' + i] !== null ||
                applicant['off_city' + '_a_' + i] !== null ||
                applicant['off_country' + '_a_' + i] !== null ||
                applicant['off_state' + '_a_' + i] !== null) {
                $scope.error['off_address_line_1' + '_a_' + i] = true;
            } else {
                $scope.error['off_address_line_1' + '_a_' + i] = false;
            }

            if (applicant['off_address_line_2' + '_a_' + i] !== null ||
                applicant['off_address_line_3' + '_a_' + i] !== null ||
                applicant['off_postal_zip_code' + '_a_' + i] !== null ||
                applicant['off_address_line_1' + '_a_' + i] !== null ||
                applicant['off_country' + '_a_' + i] !== null ||
                applicant['off_state' + '_a_' + i] !== null) {
                $scope.error['off_city' + '_a_' + i] = true;
            } else {
                $scope.error['off_city' + '_a_' + i] = false;
            }

            if (applicant['off_address_line_2' + '_a_' + i] !== null ||
                applicant['off_address_line_3' + '_a_' + i] !== null ||
                applicant['off_postal_zip_code' + '_a_' + i] !== null ||
                applicant['off_address_line_1' + '_a_' + i] !== null ||
                applicant['off_city' + '_a_' + i] !== null ||
                applicant['off_state' + '_a_' + i] !== null) {
                $scope.error['off_country' + '_a_' + i] = true;
            } else {
                $scope.error['off_country' + '_a_' + i] = false;
            }
        }

    }


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
                    if (PageData.getPageId() == "ad-1") {
                        $scope.conditionalMandatoryForAddress(applicant, i);
                    }
                    if (PageData.getPageId() == "ad-3") {
                        $scope.conditionalMandatoryForDeclaration(applicant, i);
                    }
                });
            }

        }
        _.each($scope.error, function(item, index) {
            if (item == true) {
                console.log(index);
                error = true;
            }
        });
        return error;
    };
}