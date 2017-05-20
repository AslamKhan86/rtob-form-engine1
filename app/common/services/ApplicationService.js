'use strict';

function ApplicationService($http, BASE_URL ,$q,$fancyModal,$rootScope) {
    function ApplicationService() {

    };
    ApplicationService.prototype = {

        __errorCallBack: function() {
            $fancyModal.open({
              templateUrl: 'common/templates/server-error.html',
              controller: 'ModalController',
              openingClass: 'error-modal'
            });
        },
        __prevRequestDetails:{},

        get: function(url) {
            var scope = this;
            var deferred = $q.defer();
            console.log('Application service');
            $http.get(url)
                .then(function successCallback(success) {
                  if(success.data.applicants !==undefined){
                      angular.copy(success.data.applicants, scope.__prevRequestDetails);
                  }
                  deferred.resolve(success);
                },function errorCallback(error) {
                    scope.__errorCallBack(error);
                });
            return deferred.promise;
        },
        post: function(url,data,headers){
          var scope = this;
          var deferred = $q.defer();
          console.log('Application service' + headers);
          $http({
              method: 'POST',
              data: data,
              url: url,
              headers: headers
          }).then(function successCallback(success) {
                  deferred.resolve(success);
              },function errorCallback(error) {
                  scope.__errorCallBack(error);
                  deferred.reject(error);
              });
          return deferred.promise;
        }
    };
    return ApplicationService;
};
