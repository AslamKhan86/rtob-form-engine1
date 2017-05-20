'use strict';

function rtoDate() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            ngDate: '=date',
            title: '=',
            date1: "=date1",
            year: "=year",
            month: "=month",
            disableDob: "=disabledob"
        },
        dateLabel: '=',
        templateUrl: 'common/templates/rto-date.html',
        controller: function($scope) {

            /**
             * @EventListener onElementFocus
             * @description
             * Add the css class to the separator on focus  of a
             * text box for highlighting
             */

            $scope.onElementFocus = function(e) {
                angular.element(document).find("#" + e.target.id).prev().addClass("clicked");
                angular.element(document).find("#" + e.target.id).next().addClass("clicked");
            };

            /**
             * @EventListener onElementKeyUp
             * @description
             * Remove the css class to the separator on blur  of a text box for highlighting
             * and move the focus to the next element if text value length
             * is 2 for date and month
             */

            $scope.onElementKeyUp = function(e) {
                var componentField = e.target.id.split("-")[0],
                    logicalFieldName = e.target.id.split("-")[1];
                //ASCII code 16 - DATA link escape for shift+Tab
                if (e.shiftKey == false && e.which != 9 && e.which != 16 && e.which != 38 && e.which != 40 && e.which != 39 && e.which != 37) {
                    if (componentField == "date" && e.target.value.length == 2) {
                        angular.element("#" + "month-" + logicalFieldName).focus();
                    } else if (componentField == "month" && e.target.value.length == 2) {
                        angular.element("#" + "year-" + logicalFieldName).focus();
                    } else if (componentField == "year" && e.target.value.length == 0 && (e.which == 8 || e.which == 127)) {
                        angular.element("#" + "month-" + logicalFieldName).focus();
                    } else if (componentField == "month" && e.target.value.length == 0 && (e.which == 8 || e.which == 127)) {
                        angular.element("#" + "date-" + logicalFieldName).focus();
                    }
                } else if (e.which == 9 || e.which == 16 || (e.shiftKey == true && e.which == 9)) {
                    angular.element().next().next().focus();
                }
            };

            /**
             * @Method prefixInput
             * @description
             * Check the user input and prefix if the user has entered the input
             * less than than the input value 9
             * @param e {string} value user has entered
             * @return input
             */

            $scope.prefixInput = function(e) {
                var input;
                if (parseInt(e) !== 0) {
                    input = "0" + e;
                } else {
                    input = e;
                }
                return input;
            };

            /**
             * @EventListener onElementBlur
             * @description
             * Prevent the default actions if user entered input is not number,
             * backspace or delete key based on the Ascii char code.
             */

            $scope.onElementBlur = function(e) {
                angular.element(document).find("#" + e.target.id).prev().removeClass("clicked");
                angular.element(document).find("#" + e.target.id).next().removeClass("clicked");
                var componentField = e.target.id.split("-")[0],
                    logicalFieldName = e.target.id.split("-")[1],
                    logicalFieldNameWithOutApplicants = logicalFieldName.split("_a_")[0],
                    displayErrorFlag = true,
                    age,
                    isValidPast, isValidFuture, date, ageConfig = {
                        "date_of_birth": {
                            minAge: 15
                        }
                    };

                switch (componentField) {

                    //Check for the other id expiry date  it should accept only future dates

                    case "date":
                        parseInt(e.target.value) > 9 || e.target.value.length === 2 || e.target.value === "" ? $scope.date = e.target.value : $scope.date = $scope.prefixInput(e.target.value);
                        e.target.value = $scope.date;
                        break;
                    case "month":
                        parseInt(e.target.value) > 9 || e.target.value.length === 2 || e.target.value === "" ? $scope.month = e.target.value : $scope.month = $scope.prefixInput(e.target.value);
                        e.target.value = $scope.month;
                        break;

                    case "year":
                        $scope.year = e.target.value;
                        break;

                    default:
                        $scope.date = "";
                        $scope.month = "";
                        $scope.year = "";
                        break;
                }
                date = $scope.year + "-" + $scope.month + "-" + $scope.date;

                //Check date for the validity
                if (moment(date, "YYYY-MM-DD", true).isValid()) {
                    $scope.ngDate = date;
                    switch (logicalFieldNameWithOutApplicants) {

                        //Check for the other id expiry date  it should accept only future dates

                        case "other_id_expiry_date":
                            displayErrorFlag = moment().diff(date, 'days') <= 0 ? false : true;
                            $scope.applyErrorMessages(displayErrorFlag, logicalFieldName);
                            break;

                            //Check for the DOB,it should accept past dates and pass min age criteria

                        case "date_of_birth":
                            var selectedDate = moment(date).format('YYYY-MM-DD');
                            var currentDate = moment().format('YYYY-MM-DD');
                            isValidPast = moment().subtract(100, 'years').format('YYYY-MM-DD');
                            if (selectedDate <= currentDate && selectedDate >= isValidPast)
                                displayErrorFlag = false;
                            $scope.applyErrorMessages(displayErrorFlag, logicalFieldName, true);
                            break;

                            //Handling of the other date component

                        default:
                            displayErrorFlag = moment().diff(date, 'days') >= 0 ? false : true;
                            $scope.applyErrorMessages(displayErrorFlag, logicalFieldName);
                            break;
                    }
                } else {
                    $scope.applyErrorMessages(true, logicalFieldName);
                }
            };

            /**
             * @method applyErrorMessages
             * @description
             * on call it will bind the error messages tnd sets the
             * error flag based on the param passed
             * @param {boolean} displayErrorFlag
             */
            $scope.applyErrorMessages = function(displayErrorFlag, logicalFieldName, updateTitle) {
                $scope.$emit("updateMandatoryFieldCheck", logicalFieldName.split("_a_")[0], !displayErrorFlag);
                $scope.$emit("updateDateErrorMessage", {
                    "displayErrorFlag": displayErrorFlag,
                    "id": logicalFieldName,
                    updateTitle: updateTitle
                });
            };
        },
        link: function(scope, element, attr) {

            scope.id = attr.id;

            /**
             * @EventListener keypress
             * @description
             * Prevent the default actions if user entered input is not number,
             * backspace or delete key based on the Ascii char code.
             */
            element.children().on("keypress", function(evt) {
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode >= 48 && charCode <= 57) || charCode === 8 || charCode === 127)
                    return true;
                return false;
            });
        }
    };
}
