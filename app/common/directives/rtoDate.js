/**
 * Created by Aslam on 26/09/16.
 */
'use strict';

function rtoDate($compile) {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            title: '='
        },
        dateLabel: '=',
        templateUrl: 'common/templates/rto-date.html',
        link: function(scope, element, attr) {
            var dateArray = [];
            var date = "";
            var isValidDate = false;
            var isValidMonth = false;
            var isValidYear = false;
            scope.displayLabel = attr.dateLabel + ' (dd/mm/yyyy) *';
            scope.displayErrorFlag = false;

            element.children().on("keydown", function(e) {
                scope.$apply(function() {
                    //scope.error = "";
                    scope.displayLabel = attr.dateLabel + ' (dd/mm/yyyy) *';
                    scope.displayErrorFlag = false;
                });
                if (this.name == 'month' || this.name == 'year') {
                    if (e.which == 8 && this.value == "") {
                        $(this).prev().focus();
                    };
                }
            })

            element.children().on("keyup", function() {
              var min = this.min;
              var max = this.max;
              var name = this.name;
              scope.displayLabel = attr.dateLabel + ' (dd/mm/yyyy) *';
              scope.displayErrorFlag = false;
                if (this.name == 'day') {
                    isValidDate = false;
                    if (this.value.length == this.size) {
                        if ((parseInt(this.value) <= parseInt(this.max)) && (parseInt(this.value) >= parseInt(this.min))) {
                            isValidDate = true;
                            dateArray[2] = event.currentTarget.value;
                            $(this).next().focus();
                        } else {
                            scope.$apply(function() {
                                //scope.error = "Entered "+ name +" value should be in between"+ min +" and "+ max;
                                scope.displayLabel = "Entered "+ name +" value should be in between "+ min +" and "+ max;
                                scope.displayErrorFlag = true;
                            });
                        }
                    } else {
                        scope.$apply(function() {
                            //scope.error = "Enter date in DD format";
                            scope.displayLabel = "Enter date in DD format";
                            scope.displayErrorFlag = true;
                        });
                    }
                }

                if (this.name == 'month') {
                    isValidMonth = false;
                    if (this.value.length == this.size) {
                        if ((parseInt(this.value) <= parseInt(this.max)) && (parseInt(this.value) >= parseInt(this.min))) {
                            isValidMonth = true;
                            dateArray[1] = event.currentTarget.value;
                            $(this).next().focus();
                        } else {
                            scope.$apply(function() {
                                //scope.error = "Entered "+ name +" value should be in between"+ min +" and "+ max;
                                scope.displayLabel = "Entered "+ name +" value should be in between "+ min +" and "+ max;
                                scope.displayErrorFlag = true;
                            });
                        }
                    } else {
                        scope.$apply(function() {
                            //scope.error = "Enter month in MM format";
                            scope.displayLabel = "Enter month in MM format";
                            scope.displayErrorFlag = true;
                        });
                    }
                }

                if (this.name == 'year') {
                    isValidYear = false;
                    if (this.value.length == this.size) {
                        if ((parseInt(this.value) <= parseInt(this.max)) && (parseInt(this.value) >= parseInt(this.min))) {
                            isValidYear = true;
                            dateArray[0] = event.currentTarget.value;
                        } else {
                            scope.$apply(function() {
                                //scope.error = "Entered "+ name +" value should be in between"+ min +" and "+ max;
                                scope.displayLabel = "Entered "+ name +" value should be in between "+ min +" and "+ max;
                                scope.displayErrorFlag = true;
                            });
                        }
                    } else {
                        scope.$apply(function() {
                            //scope.error = "Enter year in YYYY format";
                            scope.displayLabel = "Enter year in YYYY format";
                            scope.displayErrorFlag = true;
                        });
                    }
                }

            })

            element.children().on("focus", function() {
              if (this.name == 'month') {
                if (!isValidDate) {
                        $(this).siblings('input[name="day"]').focus();
                    }
                }
                if (this.name == 'year') {
                  if (!isValidMonth) {
                        $(this).siblings('input[name="month"]').focus();
                    }
                }

            })

            element.children().on("blur", function() {
                if (isValidDate && isValidMonth && isValidYear) {
                    checkDate();
                }
                function checkDate() {
                    date = dateArray.toString().replace(/,/g, "-");
                    var m = moment(date);

                    if (m.isValid()) {
                        console.log(date + " is valid " );
                        scope.$apply(function() {
                            //scope.error = "";
                            scope.displayLabel = attr.dateLabel + ' (dd/mm/yyyy) *';
                            scope.displayErrorFlag = false;
                        });
                    } else {
                        scope.$apply(function() {
                            //scope.error = "Date entered is invalid!";
                            scope.displayLabel = "Date entered is invalid!";
                            scope.displayErrorFlag = true;
                        });
                    }
                }

            })
            // element.children().on("keyup", function() {
            //     var name = this.name;
            //     var min = this.min;
            //     var max = this.max;
            //
            //     if (this.value.length >= this.size) {
            //         if (parseInt(this.value) > parseInt(this.max)) {
            //             scope.$apply(function() {
            //                 scope.error = "Please enter " + name + " value less than " + max;
            //             });
            //         } else if (parseInt(this.value) < parseInt(this.min)) {
            //             scope.$apply(function() {
            //                 scope.error = "Please enter " + name + " value more than " + min;
            //             });
            //         } else if (name != 'year') {
            //             $(this).next().focus();
            //         }
            //     }
            //
            //
            //
            //
            //
            // })
            //
            // element.children().on("focus", function() {
            //     var min = this.min;
            //     var max = this.max;
            //     var size = this.size;
            //
            //     var name = this.name;
            //
            //
            //
            //     scope.$apply(function() {
            //         scope.error = "";
            //     });
            //
            //
            //
            //     var isAllFilled = true;
            //     if (name == 'year') {
            //
            //
            //         if ((parseInt($(this).prev().val()) < parseInt($(this).prev()[0].min)) || (parseInt($(this).prev().val()) > parseInt($(this).prev()[0].max))) {
            //             console.log("3");
            //             $(this).prev().focus();
            //         }
            //
            //
            //         $(this).siblings("input").each(function() {
            //             if (this.value == "" || this.value.length != this.size) {
            //                 isAllFilled = false;
            //
            //                 return;
            //             }
            //         });
            //
            //         if (!isAllFilled) {
            //
            //
            //             if ($(this).siblings('input[name="day"]').val() == "" || $(this).siblings('input[name="day"]').val().length != 2) {
            //               console.log("5");
            //                 $(this).siblings('input[name="day"]').focus();
            //             } else {
            //
            //                 $(this).siblings('input[name="month"]').focus();
            //             }
            //
            //
            //         }
            //
            //     }
            //
            //     if (name == 'month') {
            //         //console.log($(this).prev() );
            //         //debugger;
            //
            //
            //         if ((parseInt($(this).prev().val()) < parseInt($(this).prev()[0].min)) || (parseInt($(this).prev().val()) > parseInt($(this).prev()[0].max))) {
            //             console.log("1");
            //             $(this).prev().focus();
            //         }
            //
            //
            //         if (this.value.length == this.size && (parseInt(this.value) > parseInt(this.max)) && (parseInt(this.value) < parseInt(this.min))) {
            //             console.log("2");
            //             $(this).next().focus();
            //         }
            //
            //
            //         if ($(this).siblings('input[name="day"]').val() == "" || $(this).siblings('input[name="day"]').val().length != size) {
            //             $(this).siblings('input[name="day"]').focus();
            //         }
            //     }
            //
            //     if (name == 'day') {
            //         if (this.value.length > this.size && (parseInt(this.value) > parseInt(this.max)) && (parseInt(this.value) < parseInt(this.min))) {
            //             $(this).next().focus();
            //         }
            //     }
            //
            //
            //
            //
            //
            //
            // })
            //
            // element.children().on("blur", function() {
            //     var min = this.min;
            //     var max = this.max;
            //     var name = this.name;
            //
            //     if (parseInt(this.value.length) != parseInt(this.size)) {
            //         scope.$apply(function() {
            //             scope.error = "Please enter in DDMMYYYY format";
            //         });
            //     }
            //
            //     // if (parseInt(this.value) > parseInt(this.max)) {
            //     //     scope.$apply(function() {
            //     //         scope.error = "Please enter " + name + " value less than " + max;
            //     //     });
            //     // } else if (parseInt(this.value) < parseInt(this.min)) {
            //     //     scope.$apply(function() {
            //     //         scope.error = "Please enter " + name + " value more than " + min;
            //     //     });
            //     // } else {
            //         if (this.name == 'day') {
            //             dateArray[2] = event.currentTarget.value;
            //         } else if (this.name == 'month') {
            //             dateArray[1] = event.currentTarget.value;
            //
            //         } else {
            //             dateArray[0] = event.currentTarget.value;
            //         }
            //
            //
            //
            //         var isAllFilled = true;
            //
            //         $(this).siblings("input").each(function() {
            //             if (this.value == "") {
            //                 isAllFilled = false;
            //                 return;
            //             }
            //         });
            //
            //         if (this.value != "" && isAllFilled == true) {
            //             if (name == 'year'){
            //
            //               if (this.value.length == this.size && (parseInt(this.value) < parseInt(this.max)) && (parseInt(this.value) > parseInt(this.min))) {
            //                 if(dateArray[0].length  == 4 && dateArray[1].length  == 2 && dateArray[2].length  == 2){
            //                   checkDate();
            //                 }
            //
            //               }
            //               else{
            //                 scope.$apply(function() {
            //                     scope.error = "Please enter in DDMMYYYY format";
            //                 });
            //               }
            //             }
            //
            //
            //         }
            //
            //         function checkDate() {
            //             date = dateArray.toString().replace(/,/g, "-");
            //             var m = moment(date);
            //             console.log(date + " : " + m.isValid());
            //             if (m.isValid()) {
            //                 scope.$apply(function() {
            //                     scope.error = "";
            //                 });
            //             } else {
            //                 scope.$apply(function() {
            //                     scope.error = "Date entered is invalid!";
            //                 });
            //             }
            //         }
            //   //  }
            // });
        }
    };
};
