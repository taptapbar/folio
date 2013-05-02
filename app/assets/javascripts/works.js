$(function(){
  var $container = $('.work_items');
  $container.imagesLoaded(function(){
    $container.masonry({
      // options
      itemSelector : '.work_item',
      columnWidth : 168
    });
  });
  
  $('.work_item').on('click', function(){
    PhotoViewer.launch($(this).attr('data-work-id'));
  });
});