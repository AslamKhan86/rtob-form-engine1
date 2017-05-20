'use strict';

function leftMenu() {
  return {
    restrict: 'E',
    controller:function ($scope) {
        /**
         * @Constructor
         * @description
         * Call the necessary initial loading from
         * LOV json
         */
        $scope.init = function () {
            $scope.__httpService.get('common/mock/menu/leftmenu.json').then(function (success) {
                    $scope.leftMenu = success.data.category;
            });
        };

        $scope.changeTheStage = function (event,page_id) {
            if(_.indexOf($scope.$parent.leftMenuDisabledStages, page_id) === -1){
                $scope.$parent.applicationData.stage.page_id = page_id;
                $scope.$parent.renderTemplate();
            }else{
                event.preventDefault();
            }
        };

        $scope.checkCompleted = function (page_id) {
            if(_.indexOf($scope.$parent.leftMenuDisabledStages, page_id) === -1){
                return true;
            }
        };

        $scope.checkDisabled = function (page_id) {
            if(_.indexOf($scope.$parent.leftMenuDisabledStages, page_id) !== -1){
                return true;
            }
        };

        $scope.init();

    },
    templateUrl: 'common/templates/left-menu.html'
  };
}
