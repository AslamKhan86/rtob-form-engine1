
'use strict';

function PageData($http, BASE_URL, $q,_) {

	var _pageData = {};
	var _pageId = "";

	return {
		_required: {},
	    getPageData: function () {
	        return _pageData;
	    },
	    getPageFields: function () {
	        return _pageData;
	    },
	    getPageId: function () {
	        return _pageId;
	    },
	    setPageId: function (value) {
	        _pageId = value;
	    },
	    setPageData: function (value) {
	        _pageData = value;
	        var that = this;
	        var required = value.filter(function(data,index) {
                  if(data['mandatory']=='Yes'){
                    that._required[data.logical_field_name+'+'+data.rwb_category]=data.logical_field_name;
                  }
            });
	    },
	   	getApplicantSpecific: function() {
	   		return _.filter(_pageData, function(item){ return item.joint === "Y";});
	   	},
	   	getOnlyApplicantSpecific: function() {
	   		return _.filter(_pageData, function(item){ return (item.joint === "Y" && item.product_specific ==="No");});
	   	},
	   	getApplicantProductSpecific: function() {
	   		return _.filter(_pageData, function(item){ return (item.joint === "Y" && item.product_specific ==="Yes");});
	   	},
	   	getOnlyProductSpecific: function() {
	   		return _.filter(_pageData, function(item){ return (item.joint === "N" && item.product_specific ==="Yes"); });
	   	},
	   	getApplicationSpecific: function() {
	   		return _.filter(_pageData, function(item){ return (item.joint === "N" && item.product_specific ==="No"); });
	   	}
	};
};