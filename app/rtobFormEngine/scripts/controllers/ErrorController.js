'use strict';

function ErrorController($fancyModal,$scope,error,_) {
  $scope.init = function() {
    $scope.applicantError = _.groupBy(error.applicant, 'rwbg_description');
    $scope.productError = error.product;
  };
  $scope.closeModal = function(){
    $fancyModal.close();
    $scope.$root.$broadcast('__displayError');
  }

  $scope.cancelApplication = function(){
    //TODO Redirect to product catalogue page
    $fancyModal.close();
    window.open('../../login/index.html#/productCatalogue', '_self');
  }
}
