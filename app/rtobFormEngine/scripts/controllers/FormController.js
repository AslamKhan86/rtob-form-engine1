'use strict';

function FormController($scope, $rootScope, $window, BasicData, ApplicationData, fulfillmentdata, _, $fancyModal, ErrorDetail, ApplicationService, StageData, PageData) {
    /**
     * @Constructor
     * @description
     * Call all the initialization here
     */
    $scope.init = function() {
        //Getting the applicants and product information
        $rootScope.signBlobArr = [];
        $rootScope.pageId = "bd";
        $rootScope.stageId = "BD";
        $scope.random();
        $rootScope.count = 0;
        $rootScope.errorCount = 0;
        $scope.isServerError = false;
        $scope.rtobSuccess = false;
        $scope.fields = {};
        $scope._required = {};
        $scope.fieldMetaData = {};
        $scope.showHeaderMenu = true;
        $scope.loadLeftMenu = false;
        var prodCatalogueData = JSON.parse(localStorage.getItem("products"));
        $scope.total_applicants = (prodCatalogueData) ? prodCatalogueData.applicants.count : 4;
        $scope.bundleName = localStorage.getItem("productName");
        var header = JSON.parse(localStorage.getItem("header"));
        $scope.headerObj = (header) ? header : {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        $scope.leftMenuCurrentStage = "ad-1";
        $scope.leftMenuDisabledStages = ["ad-1", "ad-3", "doc", "ad-4", "ad-5", "acd-1", "ffd-1", "doc-2", "rp"];
        $scope.leftMenuCompletedStage = [];
        $scope.products = (prodCatalogueData) ? $scope.setUserSelectedProducts(prodCatalogueData.products) : $scope.setProducts();
        $scope.submitInProgress = false;
        $scope.formReadyForSubmission = false;
        $scope.applicationData = new ApplicationData();
        $scope.applicationData.load().then(function(success) {
            $scope.leftMenuSelected = success.data.applicationdata.stage.page_id;
            $scope.applicationData = success.data.applicationdata;
            $scope.applicationData.application["total_applicants"] = $scope.total_applicants;
            $scope.applicationData.products = (prodCatalogueData) ? $scope.setUserSelectedProducts(prodCatalogueData.products) : $scope.setProducts();
            $scope.applicationData.stage.page_id = "bd";
            $scope.applicationData.stage.stage_id = "BD";
            $scope.createProduct();
        });
    };

    $scope.createProduct = function() {
        var data = $scope.applicationData;
        var header = $scope.headerObj;
        var url = 'common/mock/applicationdata.json';
        //var url = 'http://10.20.235.67/origination/api/v2/product?metadata=true';
        //var url = 'https://rcwbsit.sc.com/origination/api/v2/product?metadata=true';
        $scope.__httpService.get(url, data, header).then(function(success) {
            //Set the channel reference number
            $scope.applicationData = success.data;
            $scope.fields = $scope.applicationData.applicants;
            $scope.fieldMetaData = $scope.applicationData.fieldmetadata;
            $scope.__initializeFields();
            $scope.processAadhaarData();
        });
    };

    $scope.__httpService = new ApplicationService();
    $scope.formValidity = [];
    $scope.$on("updateMandatoryFieldCheck", function(evt, data, flag) {
        var mandatoryArr = [];
        //Push conditional mandatory feilds
        mandatoryArr.push("aadhaar_no");
        if ($scope.applicationData.stage.stage_id == "BD") {
            angular.forEach($scope.basicData._required, function(key, data) {
                mandatoryArr.push(key);
            });
        } else {
            angular.forEach(StageData.getStageData()._required, function(key, data) {
                mandatoryArr.push(key);
            });
        }


        if (_.indexOf(mandatoryArr, data) != -1) {
            if (_.indexOf($scope.formValidity, data) == -1 && flag) {
                $scope.formValidity.push(data)
            } else if (_.indexOf($scope.formValidity, data) != -1 && !flag) {
                $scope.formValidity.splice($scope.formValidity.indexOf(data), 1)
            }
        }
        if ($scope.formValidity.length === mandatoryArr.length) {
            $scope.formReadyForSubmission = true;
        } else {
            $scope.formReadyForSubmission = false;
        }
    });

    $rootScope.__applicant = [{
        "isDisabled": false
    }, {
        "isDisabled": true
    }, {
        "isDisabled": true
    }, {
        "isDisabled": true
    }];

    $scope.setProducts = function() {
        var url = 'common/mock/menu/headermenu.json';
        $scope.__httpService.get(url).then(function(success) {
            $scope.headerMenu = success.data.product;
            $scope.userSelectedProducts = [];
            angular.forEach($scope.headerMenu, function(value, key) {
                if ($scope.userSelectedProducts.indexOf($scope.headerMenu[key].product_type) == -1) {
                    $scope.userSelectedProducts.push($scope.headerMenu[key].product_type);
                }
            });
            return $scope.headerMenu;
        });
    }

    $scope.setUserSelectedProducts = function(products) {
        $scope.headerMenu = products;
        return $scope.headerMenu;
    }

    $scope.__initializeFields = function() {
        switch ($scope.applicationData.stage.stage_id) {
            case "BD":
                StageData.setStageData(_.where($scope.fieldMetaData.data.stages, {
                    "stageId": "BD"
                })[0]);
                $scope.basicData = new BasicData();
                break;
            case "AD":
                StageData.setStageData(_.where($scope.fieldMetaData.data.stages, {
                    "stageId": "AD"
                })[0]);
                break;
            case "DOC":
                StageData.setStageData(_.where($scope.fieldMetaData.data.stages, {
                    "stageId": "DOC"
                })[0]);
                break;
            case "ACD":
                StageData.setStageData(_.where($scope.fieldMetaData.data.stages, {
                    "stageId": "ACD"
                })[0]);
                break;
            case "FFD":
                StageData.setStageData(_.where($scope.fieldMetaData.data.stages, {
                    "stageId": "FFD"
                })[0]);
                break;
            default:
                StageData.setStageData(_.where($scope.fieldMetaData.data.stages, {
                    "stageId": "BD"
                })[0]);
                break;
        }
        $scope.renderTemplate();
    }

    $scope.renderTemplate = function() {
        switch ($scope.applicationData.stage.page_id) {
            case "bd":
                $scope.showHeaderMenu = true;
                $scope.applicationData.stage.stage_id = "BD";
                $scope.applicationData.stage.page_id = "bd";
                $scope.templateName = "rtobFormEngine/scripts/partials/basicdata.html";
                break;
            case "doc":
                $scope.showHeaderMenu = false;
                $scope.applicationData.stage.stage_id = "DOC";
                $scope.applicationData.stage.page_id = "doc";
                $scope.templateName = "rtobFormEngine/scripts/partials/documentchecklist.html";
                break;
            default:
                $scope.showHeaderMenu = false;
                //$scope.applicationData.stage.stage_id = "BD";
                //$scope.applicationData.stage.page_id = "bd";
                //$scope.applicationData.application.total_applicants = 2;
                console.log($scope.applicationData.application.total_applicants);
                $scope.templateName = "rtobFormEngine/scripts/partials/stage-renderer.html";
                break;
        }

        if ($scope.applicationData.stage.stage_id !== "BD") {
            $scope.showHeaderMenu = false;
        } else {
            $scope.showHeaderMenu = true;
        }
        $window.scrollTo(0, 0);
    };

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
        // $rootScope.dynamic = 5;
        $scope.dynamic = 5;
        $scope.type = type;
    };

    $scope.openModal = function() {
        $fancyModal.open({
            templateUrl: '../common/templates/error.html',
            controller: 'ModalController',
            showCloseButton: false,
            closeOnOverlayClick: false,
            closeOnEscape: false,
            openingClass: 'error-modal'
        });
    };

    $scope.processAadhaarData = function() {
        $scope.date1 = {}, $scope.month = {}, $scope.year = {}, $scope.disableDob = {}, $scope.disableInput = {};
        for (var i = 1; i <= $scope.applicationData.application["total_applicants"]; i++) {
            var aadharData = JSON.parse(localStorage.getItem('aadharData_' + i));
            if (aadharData !== null) {
                $scope.openApplicantAccordion();
                angular.forEach($rootScope.adhaarPrefillFields, function(prefillField, index) {
                    var firstName = aadharData['cki-first-name'] ? aadharData['cki-first-name'] : '';
                    var middleName = aadharData['cki-middle-name'] ? aadharData['cki-middle-name'] : '';
                    var lastName = aadharData['cki-last-name'] ? aadharData['cki-last-name'] : '';
                    var keys = Object.keys(prefillField);
                    switch (keys[0]) {
                        case 'first_name_a_' + i:
                            $scope.fields['first_name_a_' + i] = firstName;
                            break;
                        case 'middle_name_a_' + i:
                            $scope.fields['middle_name_a_' + i] = middleName;
                            break;
                        case 'last_name_or_surname_a_' + i:
                            $scope.fields['last_name_or_surname_a_' + i] = lastName;
                            break;
                        case 'full_name_a_' + i:
                            $scope.fields['full_name_a_' + i] = firstName + ' ' + middleName + ' ' + lastName;
                            $scope.disableInput['full_name_a_' + i] = true;
                            break;
                        case 'date_of_birth_a_' + i:
                            if (aadharData['cki-date-of-birth-ddmmyyyy']) {
                                var date = moment(new Date(aadharData['cki-date-of-birth-ddmmyyyy'])).format("DD/MM/YYYY");
                                var dateValues = moment(new Date(aadharData['cki-date-of-birth-ddmmyyyy'])).format("DD/MM/YYYY").split('/');
                                $scope.date1['date_of_birth_a_' + i] = dateValues[0];
                                $scope.month['date_of_birth_a_' + i] = dateValues[1];
                                $scope.year['date_of_birth_a_' + i] = dateValues[0];
                                $scope.disableDob['date_of_birth_a_' + i] = true;
                                $scope.fields['date_of_birth_a_' + i] = date;
                            }
                            break;
                        case 'mobile_a_' + i:
                            $scope.countryCode = '91';
                            $scope.mobileNo = aadharData['c-mobile'] ? parseInt(aadharData['c-mobile']) : '';
                            break;
                        case 'gender_a_' + i:
                            aadharData['cki-gender'] = aadharData['cki-gender'] ? aadharData['cki-gender'] : '';
                            aadharData['cki-gender'] = (aadharData['cki-gender'] === 'Male') ? 'M' : 'F';
                            $scope.fields['gender_a_' + i] = aadharData['cki-gender'];
                            break;
                        case 'aadhaar_no_a_' + i:
                            $scope.fields['aadhaar_no_a_' + i] = aadharData['cki-aadhar-no'] ? aadharData['cki-aadhar-no'] : '';
                            $scope.disableInput['aadhaar_no_a_' + i] = true;

                            break;
                        case 'pan_no_a_' + i:
                            break;
                        case 'email_a_' + i:
                            $scope.fields['email_a_' + i] = aadharData['c-email'] ? aadharData['c-email'] : '';
                            break;
                        default:
                            break;
                    }
                });
            }
        }
    };

    $scope.openApplicantAccordion = function() {
        var applicantNo = parseInt(localStorage.getItem('applicantNo'));
        if (applicantNo) {
            angular.forEach($rootScope.group, function(groupObject, index) {
                if (index + 1 === applicantNo) {
                    groupObject.open = true;
                    $rootScope.__applicant[applicantNo].isDisabled = false;
                } else {
                    groupObject.open = false;
                    $rootScope.__applicant[applicantNo].isDisabled = true;
                }
            });
        }
    };
    $scope.openDedupeModal = function() {
        $fancyModal.open({
            templateUrl: 'common/templates/dedupe.html',
            controller: 'DedupeController',
            openingClass: 'dedupe-modal',
            openingOverlayClass: 'dedupe-overlay',
            closingOverlayClass: 'dedupe-close',
            closeOnOverlayClick: false,
            closeOnEscape: false
        });
    };

    $scope.openReviewPage = function() {
        $scope.templateName = "rtobFormEngine/scripts/partials/reviewpage.html";
    };

    $scope.errorModal = function() {
        $fancyModal.open({
            templateUrl: 'common/templates/error.html',
            controller: 'ModalController',
            showCloseButton: false,
            closeOnOverlayClick: false,
            closeOnEscape: false,
            openingClass: 'error-modal'
        });
    };

    $scope.__successCallBack = function(success) {
        ApplicationData._applicantData = success.data;
        $scope.applicationData = success.data;
        $scope.isServerError = false;
        //aadhar passing the applicants on callback
        $scope.fields = $scope.applicationData.applicants;
        $scope.exactResultList = ($scope.applicationData.dedupe.exactMatch.resultList) ? $scope.applicationData.dedupe.exactMatch.resultList : [];
        $scope.likelyResultList = ($scope.applicationData.dedupe.likelyMatch.resultList) ? $scope.applicationData.dedupe.likelyMatch.resultList : [];

        $scope.exactResultList = ($scope.applicationData.dedupe.exactMatch.resultList) ? $scope.applicationData.dedupe.exactMatch.resultList : [];
        $scope.likelyResultList = ($scope.applicationData.dedupe.likelyMatch.resultList) ? $scope.applicationData.dedupe.likelyMatch.resultList : [];
        if ($scope.applicationData.dedupe !== null && $scope.applicationData.dedupe !== undefined) {
            if ($scope.applicationData.dedupe.exactMatch.responseCode == "PRO100" || $scope.applicationData.dedupe.likelyMatch.responseCode == "PRO100" && $scope.applicationData.stage.stage_id === "BD") {
                $scope.errorModal();
            } else if ($scope.exactResultList.length || $scope.likelyResultList.length && $scope.applicationData.stage.stage_id === "BD") {
                $scope.openDedupeModal();
            } else {
                $scope.__proceedNext(success);
            }
        } else {
            console.log('CSL server error');
        }

    };
    $scope.__submitApplicantDetails = function() {
        $scope.applicationData.stage.stage_params.is_dedupe_required = false;
        if ($scope.applicationData.stage.stage_id === "BD") {
            $scope.applicationData.stage.stage_params.is_dedupe_required = true;
        } else if ($scope.applicationData.stage.stage_id === "AD") {
            $scope.applicationData.dedupe.exactMatch.resultList = [];
            $scope.applicationData.dedupe.likelyMatch.resultList = [];
            if ($scope.applicationData.stage.page_id == "ad-5") {
                $scope.applicationData.stage.stage_status = "complete";
            } else {
                $scope.applicationData.stage.stage_status = "incomplete";
            }
        } else {
            $scope.applicationData.stage.stage_params.is_dedupe_required = false;
        }

        $scope.submitInProgress = true;
        var applicant_groups = $rootScope.group,
            current_applicant;
        current_applicant = $rootScope.flag;
        $scope.applicationData.stage.stage_params.current_applicant = current_applicant;
        $scope.applicationData.applicants['client_sequence_no_a_' + $rootScope.flag] = $rootScope.flag;
        var data = $scope.applicationData;
        var header = $scope.headerObj;
        //var url = 'http://10.20.235.67/origination/api/v2/application';
        //var url = 'https://rcwbsit.sc.com/origination/api/v2/application';
        var url = 'common/mock/applicants/' + $scope.applicationData.stage.page_id + '/applicants_' + $rootScope.flag + '.json';
        $scope.__httpService.get(url, data, header).then(function(success) {
            //$scope.renderNextTemplate();
            $scope.__successCallBack(success);
            $scope.submitInProgress = false;
            $scope.formReadyForSubmission = false;
            $scope.formValidity = [];
        }, function(error) {
            $scope.submitInProgress = false;
        });
    };

    $scope.error = {};
    $rootScope.flag = 1;

    $scope.$on('submitCucoDetails', function(event, cuco) {
        console.log('cuco info to be combined' + cuco.id);
        $scope.__applicantDetails = ApplicationData._applicantData;
        var data = $scope.applicationData;
        var header = $scope.headerObj;
        $scope.applicationData.stage.stage_params.is_dedupe_required = false;
        //var url = 'http://10.20.235.67/origination/api/v2/application';
        var url = 'https://rcwbsit.sc.com/origination/api/v2/application';
        //var url = 'common/mock/applicants/' + $scope.applicationData.stage.page_id + '/applicants_' + $rootScope.flag + '.json';
        $scope.__httpService.post(url, data, header).then(function(success) {
            $scope.__proceedNext(success);
        });

    });

    $scope.$on('__displayError', function() {
        $scope.isServerError = true;
    });

    $scope.__modalError = function() {
        $scope.serverError.__displayServerError("success.data");
        $scope.isServerError = false;
    };
    $scope.fullName = {};

    $scope.updateLeftMenuData = function(leftMenuCurrentStage, completedStage) {
        $scope.leftMenuCurrentStage = leftMenuCurrentStage;
        $scope.leftMenuCompletedStage.push(completedStage);
        $scope.leftMenuDisabledStages.shift($scope.applicationData.stage.page_id);
    };

    $scope.renderNextTemplate = function() {
        $scope.rtobSuccess = false;
        $scope.loadLeftMenu = true;
        var page = $scope.applicationData.stage.page_id;
        if (page === "bd") {
            $scope.rtobSuccess = true;
            $scope.applicationData.stage.page_id = "ad-1";
            $scope.applicationData.stage.stage_id = "AD";
            $scope.updateLeftMenuData('ad-1', "bd");
        } else if (page === "ad-1") {
            $scope.applicationData.stage.page_id = "ad-3";
            $scope.applicationData.stage.stage_id = "AD";
            $scope.updateLeftMenuData('ad-3', "ad-1");
        } else if (page === "ad-3") {
            $scope.applicationData.stage.page_id = "doc";
            $scope.applicationData.stage.stage_id = "DOC";
            $scope.updateLeftMenuData('doc', "ad-3");
        } else if (page === "doc") {
            $scope.applicationData.stage.page_id = "ad-4";
            $scope.applicationData.stage.stage_id = "AD";
            $scope.updateLeftMenuData('ad-4', "doc");
        } else if (page === "ad-4") {
            $scope.applicationData.stage.page_id = "ad-5";
            $scope.applicationData.stage.stage_id = "AD";
            $scope.updateLeftMenuData('ad-5', "ad-4");
        } else if (page === "ad-5") {
            $scope.applicationData.stage.page_id = "ffd-1";
            $scope.applicationData.stage.stage_id = "FFD";
            $scope.updateLeftMenuData('ffd-1', "ad-5");
        } else if (page === "ffd-1") {
            $scope.applicationData.stage.page_id = "doc-2";
            $scope.applicationData.stage.stage_id = "DOC";
            $scope.updateLeftMenuData('doc-2', "ffd-1");
        } else if (page === "doc-2") {
            $scope.applicationData.stage.page_id = "rp";
            $scope.applicationData.stage.stage_id = "RP";
            $scope.updateLeftMenuData('rp', "doc-2");

        }
        $rootScope.pageId = $scope.applicationData.stage.page_id;
        $rootScope.stageId = $scope.applicationData.stage.stage_id;
        $scope.__initializeFields();
    }

    $scope.dedupePerformed = {};

    $scope.editBasicInfo = function(applicantNo) {
        $rootScope.group[applicantNo].open = true;
        $rootScope.flag = applicantNo + 1;
        var $index;
        for ($index = $rootScope.flag; $index <= $scope.total_applicants; $index++) {
            $scope.dedupePerformed[$index] = false;
            $rootScope.__applicant[$index].isDisabled = true;
        }
    };
    $scope.__proceedNext = function(success) {
        $fancyModal.close();
        $scope.dedupePerformed[$rootScope.flag] = true;
        var applicationStatus = success.data.application.application_status;
        if (success.data.application.total_applicants == $rootScope.flag || $scope.applicationData.stage.stage_id != "BD") {
            //TODO applicationStatus =='Success' &&
            if (success.data.application.application_reference != '') {
                $scope.applicationData.application.application_reference = success.data.application.application_reference;
                $scope.appreference = success.data.application.application_reference;
                $scope.showHeaderMenu = false;
                $rootScope.flag = 1;
                $scope.renderNextTemplate();
            } else {
                //Throw server error
                $scope.serverError = new ErrorDetail();
                $scope.serverError.__showServerError(success.data);
            }
        } else {
            //move to next applicantfull_name_as_per_id
            $scope.fullName[$rootScope.flag] = success.data.applicants['full_name_as_per_id_a_' + $rootScope.flag];
            $rootScope.__applicant[$rootScope.flag].isDisabled = false;
            $rootScope.group[$rootScope.flag].open = true;
            $rootScope.flag++;
            $window.scrollTo(0, 0);
        }
    };

    $scope.menuClick = function(applicantNo, type) {
        localStorage.setItem('applicantNo', applicantNo);
        if (type === "aadhaar") {
            window.open('../../login/index.html#/?flow=aadhaar', '_self');
        } else {
            window.open('../../authentication/index.html#', '_self');
        }
    };

    $scope.openSaveModal = function() {
        $fancyModal.open({
            templateUrl: 'rtobFormEngine/scripts/partials/saveandhold.html',
            controller: 'SaveController'
        });
    };

    $scope.closeBanner = function() {
        $scope.rtobSuccess = false;
    };

    $scope.closeServerError = function() {
        $scope.isServerError = false;
    };

    $scope.$on('__saveAndHold', function() {
        var data = $scope.applicationData;
        var header = $scope.headerObj;
        //TODO - Stage id should be dynamic
        $scope.applicationData.stage.stage_id = "BD";
        $scope.applicationData.stage.stage_status = "incomplete";
        //var url = 'http://10.20.235.67/origination/api/v2/application';
        var url = 'https://rcwbsit.sc.com/origination/api/v2/application';
        $scope.__httpService.post(url, data, header).then(function(success) {
            $fancyModal.close();
            window.open('../../login/index.html#/productCatalogue?flow=productCatalogue', '_self');
        });
    });

    $scope.getFieldIdSuffix = function(type, index, joint) {
        if (type == "a" && (joint == undefined || joint == null)) {
            return "_a_" + index;
        } else if (type == "p" && joint == "N") {
            return "_p_" + index;
        } else if (type == "p" && joint == "Y") {
            return "_a_" + index + "_p_" + index;
        } else {
            return "";
        }
    };
}