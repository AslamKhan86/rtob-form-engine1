function ModalController($rootScope,$scope, $fancyModal,ErrorDetail,$timeout) {

  $scope.item = ErrorDetail.getProperty();

  $scope.appError = ErrorDetail.getAppError();

  $scope.error= $scope.item[$rootScope.errorCount];

  $scope.closeModal = function(){
      $fancyModal.close();
    if($rootScope.count-1 < 0){
      return false;
    }else{
      $timeout(function() {
        $rootScope.displayError($rootScope.count-1);}, 700);
    }
  }


  $scope.rejectApplication =function(){
    //To DO redirection - Plus save on redirection
    $fancyModal.close();
  }

};
