/**
 * Created by Aslam Khan.
 */

'use strict';
function HttpService($http, BASE_URL, CPOSCookieService) {

    return {

        setData: function(response) {
          angular.extend(this, response);
        },
        load: function(endurl, customheaders, dataToPass, args, method) {
              customheaders = (typeof customheaders === 'undefined') ? {} : customheaders;
              customheaders['Content-Type'] = 'application/json';
             
              if (CPOSCookieService.cookie != null) {
                customheaders['sessionId'] = CPOSCookieService.cookie;
              };

              var httpMethod = "", message="";
              if (!!method) {
                httpMethod = method;
              } else {
                httpMethod = (typeof dataToPass === 'undefined') ? 'GET' : 'POST';
              }
            
             return $http({
                url: endurl,
                method: httpMethod,
                data: dataToPass,
                params: args ? args : {},
                headers: customheaders,

              }).then(function(response) {
                if (response.data) {
                  if (response.data.errors) {
                    message = response.data.errors;
                    StorageService.errorDetail = response.data;
                    return false;
                  } else {
                    return response.data;
                  };
                };
              }, function(error) {
                    message = "The server is not avaialble. Please try again later.";
                    return message;
              });
            }


     };

}