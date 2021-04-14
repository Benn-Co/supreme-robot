


$('.tabbar li a').on('click', function(e) {

    e.preventDefault();

    let that = $(this),
        li = that.parent(),
        ul = li.parent();

    if(!ul.hasClass('move') && !li.hasClass('active')) {
        ul.children('li').removeClass('active');

        ul.css('--x-n', li.position().left + li.outerWidth() / 2 + 'px');
        li.addClass('move');
        ul.addClass('move');

        setTimeout(() => {
            ul.removeClass('move');
            li.removeClass('move').addClass('active');
            ul.css('--x', li.position().left + li.outerWidth() / 2 + 'px');
        }, 1200);
    }

});


function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
        }
}

(function($) {
    $("body").delegate(".more","click",function(event){
        event.preventDefault();
        //alert();
        var showMe = $(this)
        .closest(".card")
        .find(".container-prod");
      $(this)
        .closest(".product_column")
        .find(".container-prod")
        .not(showMe)
        .removeClass("information");
      $(".container-prod").removeClass("social-sharing");
      showMe
        .stop(false, true)
        .toggleClass("information")
        .removeClass("social-sharing");
      show.preventDefault();   
        
    });
  })(jQuery);
  