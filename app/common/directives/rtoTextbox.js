/**
 * Created by Aslam on 26/09/16.
 */

'use strict';

function rtoTextbox() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            disableAadhaar: "=disableaadhaar"
        },
        templateUrl: 'common/templates/rto-textbox.html',
        link: function(scope, elements, attr) {

            $(elements).focusout(function() {
                var exp = this.attributes.regexp ? this.attributes.regexp.value : "";
                var isEmail = isEmail;
                var match = function(regexp, data) {
                    if (regexp === '') {
                        return true;
                    } else {
                        exp = new RegExp('\\b' + regexp + '\\b', 'gi');
                        if (!exp.exec(data)) {

                            return false;
                        } else {
                            return true;
                        }
                    }
                }

                var str = this.value;
                if (str.length) {
                    if (str.match(exp) != null) {
                        if (scope.$parent.error) {
                            scope.$parent.error[event.target.id] = false;
                        }
                        scope.$emit("updateMandatoryFieldCheck", event.target.id.split("_a_")[0], true);
                        $(this).next().removeClass('colorRed');
                        $(this).next().addClass('colorBlue');
                    } else {
                        $(this).next().addClass('colorRed');
                        if (scope.$parent.error) {
                            scope.$parent.error[event.target.id] = true;
                        }
                        scope.$emit("updateMandatoryFieldCheck", event.target.id.split("_a_")[0], false);
                    }
                } else {
                    $(this).next().removeClass('colorRed colorBlue');
                    if (scope.$parent.error) {
                        scope.$parent.error[event.target.id] = false;
                    }
                    scope.$parent.fields[event.target.id] = null;
                    scope.$emit("updateMandatoryFieldCheck", event.target.id.split("_a_")[0], false);
                }
                /*if (str == "") {
                    //$(this).next().addClass('colorRed colorBlue');
                    if (scope.$parent.error) {
                        scope.$parent.error[event.target.id] = true;
                    }
                    scope.$emit("updateMandatoryFieldCheck", event.target.id.split("_a_")[0], false);
                }*/
            });

            $(elements).keydown(function(event) {
                var validEmail = this.attributes.isEmail.value;
                var validPan = this.attributes.isPan.value;
                var exp = this.attributes.regexp ? this.attributes.regexp.value : "";

                var match = function(regexp, data) {
                    if (regexp === '' || validEmail == "true" || validPan == "true") {
                        return true;
                    } else {
                        exp = new RegExp('\\b' + regexp + '\\b', 'gi');
                        if (!exp.exec(data)) {
                            $(event.target).next().addClass('colorRed');
                            return false;
                        } else {
                            $(event.target).next().removeClass('colorRed');
                            return true;
                        }
                    }
                }

                if (!match(exp, String.fromCharCode(event.which || event.keyCode))) {
                    if (event.keyCode == 9 || event.keyCode == 8 || event.keyCode == 32 || event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 16 || event.keyCode == 20) {
                        $(event.target).next().addClass('colorBlue');
                        $(event.target).next().removeClass('colorRed');
                    } else {
                        event.preventDefault();
                    }
                }
            });
        }
    };
};
