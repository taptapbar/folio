$(function(){
  var $container = $('.work_items');
  $container.imagesLoaded(function(){
    $container.masonry({
      // options
      itemSelector : '.work_item',
      columnWidth : 168
    });
  });
});