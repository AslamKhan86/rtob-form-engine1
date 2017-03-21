function ErrorDetail() {
      var error = {};
      var appError = '';
      return {
          getProperty: function () {
              return error;
          },
          setProperty: function(value,index) {
              error[index] = value;
          },
          setAppError: function(value){
              appError = value;
          },
          getAppError: function(){
              return appError;
          }
      };
  };
