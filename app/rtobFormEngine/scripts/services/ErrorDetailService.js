'use strict';

function ErrorDetail($fancyModal,$timeout,_) {
    function ErrorDetail() {

    };
    ErrorDetail.prototype = {

        __errorMessage:{},
        __showServerError: function(error){
          var _this=this;
          var applicant = error.stage.applicant_status;
          var arr1 = [];
          _.each(applicant,function(item,index){
            var applicant_no = item.applicant_no;
            if(item.status=="Error"){
              _.each(item.error,function(data,key){
                if(data.code !==''){
                  data['applicant_name'] = error.applicants['full_name_as_per_id_a_'+applicant_no];
                  arr1.push(data);
                }
              });
            }
          });

          //Product ErrorDetail
          var arr2 = {};
          var productError = error.products;
          _.each(error.products,function(item,index){
            if(item.status=="Error"){
              arr2[index] = item.error;
            }
          });
          this.__errorMessage['applicant'] = arr1 ;
          this.__errorMessage['product'] = arr2;

          $timeout(function(){
            _this.__displayServerError();
          },800);
        },
        __displayServerError: function(){
          var scope = this;

            $fancyModal.open({
              templateUrl: 'rtobFormEngine/scripts/partials/servererror.html',
              controller: 'ErrorController',
               openingClass: 'error-modal',
              resolve: {
                error: function() {
                  return scope.__errorMessage;
                }
              }
              });
        }
    };
    return ErrorDetail;
};
