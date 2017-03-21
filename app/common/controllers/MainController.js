'use strict';

/**
 * @ngdoc controller
 * @name rtob-form-engine.controller:MainController
 * @description
 * Main Controller to handle the rtob-form-engine
 *
 * @author Aslam Khan.
 */

function MainController($scope, $state, $rootScope, $window, $stateParams, $http, ApplicationData,FormData, _, $fancyModal, ErrorDetail) {
    // Controller Init
    $scope.init = function() {
        //Getting the applicants and product information
        console.log(localStorage.getItem("products"));
        var prodCatalogueData = JSON.parse(localStorage.getItem("products"));
        $scope.total_applicants = (prodCatalogueData) ? prodCatalogueData.applicants.count : 2;
        console.log(prodCatalogueData);
        $scope.headerObj = (prodCatalogueData) ? prodCatalogueData.header : {'Content-Type': 'application/x-www-form-urlencoded'};
        $scope.products = (prodCatalogueData) ? prodCatalogueData.products : $scope.setProducts();
        $scope.applicationData = new ApplicationData();
        $scope.formData = new FormData();
        $scope.applicationData.load().then(function(success) {
            $scope.leftMenuSelected = success.data.applicationdata.stage.page_id;
            $scope.applicationData = success.data.applicationdata;
            $scope.applicationData.application["total_applicants"] = $scope.total_applicants;
            $scope.applicationData.products = (prodCatalogueData) ? prodCatalogueData.products : $scope.setProducts();
            //$scope.applicationData.stage.applicant_status = $scope.ApplicantStatus();
            $scope.createProduct();
        });

        console.log("Inside the init of RTO controller");
    };

    $scope.setProducts = function() {
        $http({
            method: 'GET',
            url: 'common/mock/headermenu.json'
        }).then(function(success) {
            $scope.headerMenu = success.data.product;
            $scope.userSelectedProducts = [];
            angular.forEach($scope.headerMenu, function(value, key) {
                if ($scope.userSelectedProducts.indexOf($scope.headerMenu[key].product_type) == -1) {
                    $scope.userSelectedProducts.push($scope.headerMenu[key].product_type);
                }

            });
            return $scope.headerMenu;
        }, function(error) {

        });
    }

    $scope.ApplicantStatus = function() {
        return [];
    }

    $http({
        method: 'GET',
        url: 'common/mock/leftmenu.json'
    }).then(function(success) {
        $scope.leftMenu = [];
        for (var i = 0; i < success.data.category.length; i++) {
            var item = productFilter(success.data.category[i]);
            if (item) {
                $scope.leftMenu.push(item);
            }
        }
    }, function(error) {

    });

    var productFilter = function(item) {
        if ($scope.userSelectedProducts != undefined) {
            for (var i = 0; i < item.product_type.length; i++) {
                if ($scope.userSelectedProducts.indexOf(item.product_type[i]) > -1) {
                    return item;
                }
            }
        }
    };

    $scope.getClass = function(pageId) {
        if ($scope.leftMenuSelected == pageId) {
            return "selected";
        } else {
            return "unselected";
        }
    }

    $scope.templateName = "rtobFormEngine/scripts/partials/formrenderer.html";

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
        $scope.dynamic = 5;
        $scope.type = type;
    };
    $scope.random();

    $rootScope.count = 0;

    $rootScope.errorCount = 0;

    $scope.openModal = function(){
        $fancyModal.open(
          {
            templateUrl: '../common/templates/error.html',
            controller:'ModalController',
            showCloseButton:false,
            closeOnOverlayClick:false,
            closeOnEscape:false
          }
        );
    };

    $rootScope.displayError = function(){
        $rootScope.count--;
        $rootScope.errorCount++;
        $scope.openModal();
    };

    $scope.checkError = function(success){
      //console.log(success);

      var applicationData = success.data.applicationdata;

      //Applicant rejection error
      var appError = applicationData.application.application_error_code;

      //App error
      var applicant = applicationData.stage.applicant_status;
      var applicantErrors = [];
      var applicantError = applicant.filter(function(data){
        applicantErrors.push(data.error);
        return applicantErrors;
      });

      //Product error
      var product = applicationData.products;
      var productErrors = [];
      var productError = product.filter(function(data){
        productErrors.push(data.error);
        return productErrors;
      });

      appError: // The first error for applicantion cancel error
      if(appError){
        //TO-DO : Discussion on app error JSON code
        ErrorDetail.setAppError(applicationData.application.application_error_message,appError);
        $scope.openModal();
        break appError;
      }else{
          applicantError: // The second error for applicant
            if(applicantErrors.length){
                    _.each(applicantErrors, function(error, index) {
                      _.each(error, function(item, index) {
                        $rootScope.count++;
                        ErrorDetail.setProperty(item,$rootScope.count);
                      });
                    });
              productError: // The third error for prooduct
              if(productErrors.length){
                _.each(productErrors, function(product, index) {
                  _.each(product, function(item, index) {
                    $rootScope.count++;
                    ErrorDetail.setProperty(item,$rootScope.count);
                  });
                });

              }
            }
        }
        $rootScope.displayError($rootScope.count);
    };



    //Product Service call
    $scope.createProduct= function(){
      var data=$scope.applicationData;
      var header=$scope.headerObj;
      $http({
          method: 'POST',
          data: data,
          url: 'http://10.20.235.67/origination/api/v2/product',
          headers: header
      }).then(function(success) {
          //Set the channel reference number
          $scope.applicationData = success.data;
          $scope.fields = $scope.applicationData.applicants;

          //Setting the applicant object
          //$scope.applicationData = $scope.applicationData.setApplicant($scope.basicData, $scope.applicationData, $scope.total_applicants);
      }, function(error) {
          console.log('error while getting data');
      });
    };

    $scope.error ={};
    $scope.flag = 1;

    $scope.checkAppData = function(){
      var required = $scope.formData._required;
      var applicant = $scope.applicationData.applicants;
      var total_applicant = $scope.applicationData.application.total_applicants;
      var error = false;

      if ($scope.flag<=total_applicant) {
        _.each(required, function(required, index) {
          $scope.error[required+'_a_'+$scope.flag]=false;
          if(applicant[required+'_a_'+$scope.flag]=='' || applicant[required+'_a_'+$scope.flag]==null){
            $scope.error[required+'_a_'+$scope.flag]=true;
            error = true;
          }
        });
        if(error){
          return true;
        }else{
          $scope.applicationData.stage.stage_params.is_dedupe_required = true;
          var applicant_groups = $rootScope.group, current_applicant;
          angular.forEach(applicant_groups, function (item, index) {
            if (item.open) {
              current_applicant = index+1;
            }
          });
          $scope.applicationData.stage.stage_params.current_applicant = current_applicant;
          var data=$scope.applicationData;
          var header=$scope.headerObj;
          $http({
              method: 'POST',
              data: data,
              url: 'http://10.20.235.67/origination/api/v2/application',
              headers: header
          }).then(function(success) {
              //Set the channel reference number


              $scope.applicationData = success.data;
              ApplicationData._appData = success.data;
              $scope.fields = $scope.applicationData.applicants;
              if (($scope.applicationData.dedupe != undefined) && ($scope.applicationData.dedupe.exactMatch != undefined|| $scope.applicationData.dedupe.likelyMatch != undefined)) {
                $scope.openDedupeModal();
              }

              $scope.flag++;
              $scope.submitData();

          }, function(error) {
              console.log('error while getting data');
          });
        }
      }
      
    };

    $scope.openDedupeModal= function(){
      $fancyModal.open(
          {
            templateUrl: 'common/templates/dedupe.html',
            controller:'DedupeController',
            openingClass: 'dedupe-modal',
            closingOverlayClass: 'dedupe-modal',
            closingOverlayClass:'dedupe-close'

          }
        );
    }

    $scope.submitData= function(){
      if($scope.checkAppData()){
        //TO-DO Reqrite Opening of the modal pop up
        $fancyModal.open(
          {
            template: '<div class="error">* Please update the mandatory fields.</div>',
          }
        );

      }
    };

};
