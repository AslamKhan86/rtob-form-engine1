'use strict';

function rtoMobile() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            selectFields: '=selectfields',
            countryCode: "=countrycode",
            mobileNo: "=mobileno",
            regexp: "=regexp",
            Length: "=maxlength",
            logicalFieldName: "=d",
            witharea: "=witharea"
        },
        templateUrl: 'common/templates/rto-mobile.html',
        link: function(scope, element, attr) {
            scope.countryCode = "91";
            scope.mobileNo = "";
            scope.areaCode = "";
            scope.$watch('mobileNo', function(mobileNo) {
                if(mobileNo) {
                    if(scope.witharea == "Y") {
                        scope.$parent.fields[scope.logicalFieldName] = this.countryCode + "-" + this.areaCode + "-" + mobileNo;
                    } else {
                        scope.$parent.fields[scope.logicalFieldName] = this.countryCode + "-" + mobileNo;
                    }
                }
            });
            //scope.selectFields = scope.selectFields['mobile'];
            scope.selectFields = [{
                "Action Required": "",
                "Category": "Basic Data 1",
                "Country": "IN",
                "System Name": "RTOB",
                "Sorting Order": "",
                "name": "India (+91)",
                "Field Name": "mobile",
                "Special Condition": "No",
                "Status": "A",
                "Logical_Field_Name": "mobile",
                "Product Name": "savings account",
                "id": "91",
                "NTB": "Y",
                "ETB": "Y"
            },{
                "Action Required": "",
                "Category": "Basic Data 1",
                "Country": "IN",
                "System Name": "RTOB",
                "Sorting Order": "",
                "name": "Singapore (+65)",
                "Field Name": "mobile",
                "Special Condition": "No",
                "Status": "A",
                "Logical_Field_Name": "mobile",
                "Product Name": "savings account",
                "id": "65",
                "NTB": "Y",
                "ETB": "Y"
            },{
                "Action Required": "",
                "Category": "Basic Data 1",
                "Country": "IN",
                "System Name": "RTOB",
                "Sorting Order": "",
                "name": "United States of America (+197)",
                "Field Name": "mobile",
                "Special Condition": "No",
                "Status": "A",
                "Logical_Field_Name": "mobile",
                "Product Name": "savings account",
                "id": "65",
                "NTB": "Y",
                "ETB": "Y"
            }];

            scope.logicalFieldName = scope.logicalFieldName;
            var param = {},specialKeys = [9, 16, 91];
            param.className = 'rto-mobile';
            element.addClass(param.className);
            element.children().on("keyup", function(event) {
                if (specialKeys.indexOf(event.keyCode) != -1) {
                    return;
                }
            });

            element.children().on("keypress", function(event) {
                if(event.target.maxLength < event.target.value.length){
                    return false;
                }
            });

            scope.onSelectCallback = function(item, model){
                if(this.mobileNo !== undefined) {
                    this.countryCode = model;
                    if(scope.witharea == "Y") {
                        scope.$parent.fields[scope.logicalFieldName] = this.countryCode + "-" + this.areaCode + "-" + this.mobileNo;
                    } else {
                        scope.$parent.fields[scope.logicalFieldName] = this.countryCode + "-" + this.mobileNo;
                    }
                }
            };
            scope.updateMobileNo =function (){
                if(this.mobileNo !== undefined) {
                    if(scope.witharea == "Y") {
                        scope.$parent.fields[scope.logicalFieldName] = this.countryCode + "-" + this.areaCode + "-" + this.mobileNo;
                    } else {
                        scope.$parent.fields[scope.logicalFieldName] = this.countryCode + "-" + this.mobileNo;
                    }
                    scope.$parent.error[scope.logicalFieldName] = false;
                    scope.$emit("updateMandatoryFieldCheck",scope.logicalFieldName.split("_a_")[0],true);
                    scope.$emit("updateDateErrorMessage",{"displayErrorFlag":false,"id":scope.logicalFieldName,updateTitle:false});
                }
                else {
                    scope.$parent.fields[scope.logicalFieldName] = null;
                    scope.$parent.error[scope.logicalFieldName] = true;
                    scope.$emit("updateMandatoryFieldCheck",scope.logicalFieldName.split("_a_")[0],false);
                    scope.$emit("updateDateErrorMessage",{"displayErrorFlag":true,"id":scope.logicalFieldName,updateTitle:false});
                }       
            }
        }
    }
}
