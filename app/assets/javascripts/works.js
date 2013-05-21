$(function(){
  function Work() {
  
  }

  Work.prototype = {
    template : function(work) {
      return [
        '<div id="work_', work.id, '" class="work_item" data-work-id="', work.id, '"', 
                                                       'data-img-src="', work.image_url_large, '"',
                                                       'data-title="', work.title, '"',
                                                       'data-desc="', work.description, '">',
          '<div class="image">',
            '<img src="', work.image_url_thumb, '"/>',
            '<div class="hover_cover">',
              '<div class="info">',
                '<div class="title">', work.title, '</div>',
                '<div class="desc">', work.description, '</div>',
              '</div>',
            '</div>',
          '</div>',
        '</div>'
      ].join('');
    },
    
    templateAtHomepage : function(work) {
      return [
        '<li>',
          '<img src="', work.image_url_large, '" data-thumb="', work.image_url_thumb, '"',
                                                'data-work-id="', work.id, '"',
                                                'data-work-caption="', work.caption, '"',
                                                'id="work_', work.id, '"', ' />',
        '</li>'
      ].join('');
    }
  }
  window.Work = new Work();
});

$(function(){
  var $container = $('.work_items');
  $container.infinitescroll({
      navSelector    : "div.pagination_container",
      nextSelector   : "div.pagination_container a:first",
      itemSelector   : ".work_item",
  		debug		 	     : false,
  		dataType	 	   : 'json',
      bufferPx       : 1000,
      appendCallback : false,

      loading      : {
        img        : '/images/admin/spinner.gif',
        finishedMsg: '',
        msgText    : ''
      },
  		path: function(index) {
  			return "works.json/?page="+index;
  		}
    },
    function (data) {
      var newElementsHtml = ''; 
      for (var i=0; i < data.length; i++) {
        var work = data[i].work;
        newElementsHtml += Work.template(work);
      }
      
      var $newElems = $(newElementsHtml);
      $container.imagesLoaded(function(){
        $container.append($newElems).masonry('appended', $newElems);
      });
    }
  );
  
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