$("#phone").intlTelInput({
  initialCountry:'in',
  separateDialCode:true,
  nationalMode:false,
  preferredCountries:["in", "sg"]
});

$('.highlight').each(function () {
  $(this).addClass("allowselect");
});

$('.highlight').each(function () {
  var btnHtml = '<div class="zero-clipboard" style="display: block; width: 500px; border: 1px solid gray; border-radius: 4px; text-align: center;position: absolute; padding: 5px; left:100%; top: -1px; margin-left: -498px;cursor: pointer;"><span class="btn-clipboard">To copy, click on the code and use CMD+C (Mac) or Ctrl+C (Windows)</span></div>'
  $(this).before(btnHtml)
})

$(document).foundation();

/**
* flexible-selector
*/
var flexibleSelector = {
  $flexibleSelectors: null,
  openClass: 'open',
  selectClass: 'selected',
  init: function(){
    var self = this;

    self.$flexibleSelectors = $('.flexible-selector');
    self.eventHandler();
  },
  eventHandler: function(){
    var self = this;

    // Opening a flexible-selector
    self.$flexibleSelectors.find('.flexible-selector--default').click(function(){
      self.$flexibleSelectors.removeClass(self.openClass);
      $(this).parents('.flexible-selector').addClass(self.openClass);
    });

    // Click on a flexible-selector list
    self.$flexibleSelectors.find('.flexible-selector__items ul li a').click(function(){
      var $that = $(this);
      var $flexibleSelector = $that.parents('.flexible-selector');
      var $input = $flexibleSelector.find('input');
      var $title = $(this).parents('.flexible-selector').find('.flexible-selector--default div');

      // Remove selected class
      $flexibleSelector.find('.flexible-selector__items a').each(function(){
        $(this).removeClass(self.selectClass);
      });

      // Update selected value
      $title.html($that.html());
      $input.val($that.attr('data-value')).trigger('change');

      // If back to default, remove selected class else addclass on right element
      if($that.hasClass('flexible-selector--selected')){
        $title.removeClass(self.selectClass);
        $title.html($title.attr('data-title'));
      }
      else{
        $title.addClass(self.selectClass);
        $that.addClass(self.selectClass);
      }

      // Close dropdown
      $flexibleSelector.removeClass(self.openClass);
    });

    // Close all dropdown onclick on another element
    $(document).bind('click', function(e){
      if (! $(e.target).parents().hasClass('flexible-selector')){ self.$flexibleSelectors.removeClass(self.openClass); }
    });
  }
};

$(function(){
  flexibleSelector.init();
});
