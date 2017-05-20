function ModalController($scope, $fancyModal) {

  $scope.error= '';

  $scope.cancelApplication = function(){
      //TODO redirection - for cordova build
      $fancyModal.close();
      window.open('../../login/index.html#/productCatalogue?flow=productCatalogue', '_self');
  };

  $scope.reviewApplication =function(){
    $fancyModal.close();
  };

  $scope.__retrySubmission = function(){
    $fancyModal.close();
    //TODO retry submission
    //$scope.$root.$broadcast('__retrySubmission');
  };

};
