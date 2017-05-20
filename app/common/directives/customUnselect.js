
'use strict';

function customUnselect() {
	return {
	    require: 'uiSelect',
	    placeHolder: "",
	    link: function(scope, element, attrs, $select) {
	        $select.toggle = function(e) {
				console.log("select has been toggled");
				if (attrs.placeHolder == undefined || attrs.placeHolder == "") {
					attrs.placeHolder = $select.searchInput.attr("placeholder");
				}
				e.currentTarget.value = (this.selected !== undefined && this.selected !== null) ? this.selected.CODE_DESC : "";
				if (e.currentTarget.value == "") {
					this.selected = undefined;
				}
				if (!$(element).parent().find("span.selectize-control-floating-label").is(":visible")) {
					$(element).parent().find("span.selectize-control-floating-label").show();
				}
	        }

	        scope.$watch('$select.search', function() {
				if ($select.search == "" && $select.selected != undefined && !$select.clickTriggeredSelect) {
                    var logicalFieldName = attrs.id.split("_a_")[0];
                    var applicant = attrs.id.split("_a_")[1];
                    console.log(attrs.placeHolder);
					console.log("blank string searched");
					$select.selected = undefined;
					$(element).find('input.ui-select-search').attr('placeholder',attrs.placeHolder);
					$(element).parent().find("span.selectize-control-floating-label").hide();
					attrs.value === undefined ? scope.$parent.fields[attrs.id]=null : '';
                    if(logicalFieldName === "other_id_type"){
                    	scope.$emit("resetOtherIdTypeChildFields",{"logicalFieldName":logicalFieldName,"applicant":applicant});
                    }
				}
	        });
	    }
    };
}