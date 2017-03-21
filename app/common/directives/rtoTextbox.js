/**
 * Created by Aslam on 26/09/16.
 */

'use strict';

function rtoTextbox() {
    return {
        restrict: 'E',
        replace: true,
        //scope:{index:'@'},
        templateUrl: 'common/templates/rto-textbox.html',
        link: function(scope, elements, attr) {

            //scope.test =attr.index;
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

                if (str.match(exp) != null) {
                    $(this).next().removeClass('colorRed');
                } else {
                    $(this).next().addClass('colorRed');
                }


            });

            $(elements).keydown(function() {
                var validEmail = this.attributes.isEmail.value;
                var exp = this.attributes.regexp ? this.attributes.regexp.value : "";
                var match = function(regexp, data) {
                    if (regexp === '' || validEmail == "true") {
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
                    if (event.keyCode == 9 || event.keyCode == 8 || event.keyCode == 32 || event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
                        $(event.target).next().addClass('colorBlue');
                        $(event.target).next().removeClass('colorRed');
                    } else {
                        event.preventDefault();
                    }
                }
            });
            $(elements).keydown(function() {
                if (!$(this).val().length) {
                    $(this).next().removeClass('colorBlue');
                }
            });
            scope.$watch('pagingOptions', function() {

            }, true);

            scope.setPagingData = function(data, page, pageSize) {

            };


        }
    };
};
