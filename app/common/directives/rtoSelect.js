/**
 * Created by Aslam on 26/09/16.
 */

'use strict';

function rtoSelect() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            i: '=',
            field: '=',
            selectvals: '=',
            fields: '=',
            isdisabled: '=',
            fieldidsuffix: '='
        },
        templateUrl: 'common/templates/rto-select.html',
        link: function (scope, elements, attr) {
            console.log(scope.fields,"------",scope.fieldidsuffix,"------", scope.field);
            scope.$on("mobComponentError", function (e, data) {
                scope.mobComponentError = data;
            });

            scope.$on("resetOtherIdTypeChildFields", function (event, data) {
                scope.$parent.visibility['other_id_no' + fieldidsuffix] = true;
                scope.$parent.visibility['other_id_expiry_date' + fieldidsuffix] = true;
                scope.$parent.error['other_id_no' + fieldidsuffix] = false;
                scope.$parent.error['other_id_expiry_date' + fieldidsuffix] = false;
                scope.$parent.fields['other_id_no' + fieldidsuffix] = null;
                scope.$parent.fields['other_id_expiry_date' + fieldidsuffix] = null;
            });

            scope.onSelectCallback = function (item, model, currentField, index, select,fieldidsuffix) {

                fieldidsuffix = fieldidsuffix === undefined ? "_a_1" : fieldidsuffix;
                index = index === undefined ? 0 : index;
                scope.$emit("updateMandatoryFieldCheck", currentField, true);
                if (currentField === "title") {
                    var fieldMapping = scope.$parent.titleToGenderMapping;
                    var destinationValue = "";
                    angular.forEach(fieldMapping, function (value, key) {
                        if (select.selected != undefined && select.selected !== null && value.source == select.selected.CODE_DESC) {
                            destinationValue = value.destination.TP_System_Value;
                        }
                    });
                    if (destinationValue !== "") {
                        scope.$parent.fields["gender" + fieldidsuffix] = destinationValue;
                        scope.$parent.disabled['gender' + fieldidsuffix] = true;
                    }
                    else {
                        scope.$parent.fields["gender" + fieldidsuffix] = null;
                    }
                    if(model == "MR" || model == "MRS" || model == "MS"){
                      scope.$parent.visibility['gender' + fieldidsuffix] = true;
                    }else{
                      scope.$parent.visibility['gender' + fieldidsuffix] = false;
                    }
                }
                if (currentField == "other_id_type") {
                    scope.$parent.visibility['other_id_no' + fieldidsuffix] = false;
                    if (model === "T0012") {
                        scope.$parent.visibility['other_id_expiry_date' + fieldidsuffix] = true;
                        scope.$parent.error['other_id_expiry_date' + fieldidsuffix] = false;
                    } else {
                        scope.$parent.visibility['other_id_expiry_date' + fieldidsuffix] = false;
                    }
                }
                //Additional data conditional presence
                if (currentField == "client_work_type") {
                    scope.$parent.visibility['business_establishment_date' + fieldidsuffix] = true;
                    scope.$parent.visibility['ownership_type' + fieldidsuffix] = true;
                    scope.$parent.visibility['incorporation_country' + fieldidsuffix] = true;
                    scope.$parent.visibility['incorporation_date' + fieldidsuffix] = true;
                    if (model === "SE") {
                        scope.$parent.visibility['business_establishment_date' + fieldidsuffix] = false;
                        scope.$parent.visibility['ownership_type' + fieldidsuffix] = false;
                        scope.$parent.visibility['incorporation_country' + fieldidsuffix] = false;
                        scope.$parent.visibility['incorporation_date' + fieldidsuffix] = false;
                    }
                }

                if (currentField == "ownership_type") {
                    scope.$parent.visibility['percentage_of_share_holding' + fieldidsuffix] = true;
                    if (model === "P") {
                        scope.$parent.visibility['percentage_of_share_holding' + fieldidsuffix] = false;
                    }
                }

                //Additional data ends here

                if (currentField == "repayment_mode") {
                    console.log(model);
                    if (model == "EDA") {
                        scope.$parent.visibility['eda_bank_utility_CODE_DESC' + fieldidsuffix] = false;
                        scope.$parent.visibility['eda_branch' + fieldidsuffix] = false;
                        scope.$parent.visibility['eda_city' + fieldidsuffix] = false;
                        scope.$parent.visibility['eda_CODE_DESC' + fieldidsuffix] = false;
                        scope.$parent.visibility['effective_date' + fieldidsuffix] = false;
                        scope.$parent.visibility['expiry_date' + fieldidsuffix] = false;
                        scope.$parent.visibility['bank_sort_code' + fieldidsuffix] = false;
                        scope.$parent.visibility['frequency' + fieldidsuffix] = false;

                        scope.$parent.visibility['account_type_1' + fieldidsuffix] = false;
                        scope.$parent.visibility['account_no_1' + fieldidsuffix] = false;
                        //scope.$parent.visibility['account_no_2_a_' + fieldidsuffix] = true;


                    } else if (model == "SI") {
                        scope.$parent.visibility['account_type_1' + fieldidsuffix] = false;
                        scope.$parent.visibility['account_no_1' + fieldidsuffix] = false;
                        //scope.$parent.visibility['account_no_2_a_' + fieldidsuffix] = false;
                        scope.$parent.visibility['frequency' + fieldidsuffix] = false;
                        scope.$parent.visibility['effective_date' + fieldidsuffix] = false;
                        scope.$parent.visibility['expiry_date' + fieldidsuffix] = false;

                        scope.$parent.visibility['eda_bank_utility_CODE_DESC' + fieldidsuffix] = true;
                        scope.$parent.visibility['eda_branch' + fieldidsuffix] = true;
                        scope.$parent.visibility['eda_city' + fieldidsuffix] = true;
                        scope.$parent.visibility['eda_CODE_DESC' + fieldidsuffix] = true;
                        scope.$parent.visibility['bank_sort_code' + fieldidsuffix] = true;
                    }
                }

                if (item.CODE_DESC) {
                    scope.$emit('selectedID', item.CODE_DESC);
                    if (currentField == 'bene_bank') {
                        $('#bene_city').text('');
                        $('#bene_branch').text('');
                        scope.$emit('beneficiaryBankSelected', item.CODE_VALUE);
                    }
                    if (currentField == 'bene_city') {
                        $('#bene_branch').text('');
                        $('#bene_city').text(item.CODE_DESC);
                        scope.$emit('beneficiaryCitySelected', item.CODE_VALUE);
                    }
                    if (currentField == 'bene_branch') {
                        $('#bene_branch').text(item.CODE_DESC);
                    }

                    if (currentField == 'eda_bank_utility_CODE_DESC') {
                        $('#eda_city').text('');
                        $('#eda_branch').text('');
                        scope.$emit('edaBankSelected', item.CODE_VALUE);
                    }
                    if (currentField == 'eda_city') {
                        $('#eda_branch').text('');
                        $('#eda_city').text(item.CODE_DESC);
                        scope.$emit('edaCitySelected', item.CODE_VALUE);
                    }
                    if (currentField == 'eda_branch') {
                        $('#eda_branch').text(item.CODE_DESC);
                        scope.$parent.visibility['other_id_no' + fieldidsuffix] = false;
                    }
                    if (model === "VI") {
                        scope.$parent.visibility['other_id_expiry_date' + fieldidsuffix] = true;
                        scope.$parent.error['other_id_expiry_date' + fieldidsuffix] = false;
                    } else {
                        //scope.$parent.visibility['other_id_expiry_date_a_'+(new Number(index)+1)]=false;
                    }
                }
            };

        }
    }
};
