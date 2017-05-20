'use strict';
function MandatoryCheck($http,$q,_) {
    var instance;
    function MandatoryCheck() {
      if(typeof instance != "undefined") return instance;
      instance = this;
    };
    MandatoryCheck.prototype = {
        __mandatoryFields:{},

        __submitStageData:[],

        __isValid: function(rwb_category) {
            var scope = this;
            var category = rwb_category;
            var requiredFields = _.keys(scope.__mandatoryFields);
            scope.__submitStageData = [];
            function required(value) {
                if(value.includes(category)){
                  scope.__submitStageData.push(value.split('+')[0]);
                }
              }

            var filtered = requiredFields.filter(required);
        },

  };
  return MandatoryCheck;
};
