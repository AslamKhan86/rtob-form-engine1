
'use strict';

function StageData($http, BASE_URL, $q,_) {

	var _stageData = {};

	return {
		_required: {},
	    getStageData: function () {
	        return _stageData;
	    },
	    getStageFields: function () {
	        return _stageData.fields;
	    },
	    getStageId: function () {
	        return _stageData.stageId;
	    },
	    getStageName: function () {
	        return _stageData.stageName;
	    },
	    setStageData: function (value) {
	        _stageData = value;
	    	var required = value.fields.filter(function(data,index) {
                  if(data['mandatory']=='Yes'){
                    //_required[data.logical_field_name+'+'+data.rwb_category]=data.logical_field_name;
                  }
            });
	    }
	};
};