jQuery(function($) {
  $('.selector').click(function(){
    var lang = $(this).attr('data-lang');
    $('.selector').removeClass('selected');
    $(this).addClass('selected');
    
    $('.bio_text').hide();
    $(".content ."+lang).show();
  });
});