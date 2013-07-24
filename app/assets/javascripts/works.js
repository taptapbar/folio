$(function(){
  function Work() {
    this.currentYear = '';
  }

  Work.prototype = {
    template : function(work) {
      return [
        '<div id="work_', work.id, '" class="work_item" data-work-id="', work.id, '"', 
                                                       'data-year="', work.year, '"',
                                                       'data-img-src="', work.image_url_large, '"',
                                                       'data-title="', work.title, '"',
                                                       'data-desc="', work.year, '">',
          '<div class="image">',
            '<img src="', work.image_url_thumb, '"/>',
            '<div class="hover_cover">',
              '<div class="info">',
                '<div class="title">', work.title, '</div>',
                '<div class="desc">', work.year, '</div>',
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
    },
    
    renderYearLine : function(workItems) {
      var that = this;
      workItems.each(function(index, value) {
        var year = $(this).attr('data-year');
        
        if (that.currentYear !== year && parseInt(that.currentYear) > parseInt(year)) {
          var yearLine = $('<div class="year_line">'+year+'</div>').css({top: $(this).position().top});
          $('.year_lines').append(yearLine);
          yearLine.fadeIn();
          that.currentYear = year;
        }
      });
    },
    
    renderYearLineAfterRendering : function(workItems) {
      var that = this;
      setTimeout(function() { that.renderYearLine(workItems); }, 500);
    }
  }
  window.Work = new Work();
});

$(function(){
  var $container = $('.work_items');
  
  $container.imagesLoaded().done( function( instance ) {
    $container.masonry({
      itemSelector : '.work_item',
      columnWidth : 168,
      isFitWidth : true,
      hiddenStyle : { opacity: 0, scale: 1 },
      visibleStyle : { opacity: 1, transform: 'scale(1)' }
    }).masonry('on', 'layoutComplete', function(msnryInstance, laidOutItems) {
      Work.renderYearLineAfterRendering($('.work_item'));
    });
  });
  
  $container.infinitescroll({
      navSelector    : "div.pagination_container",
      nextSelector   : "div.pagination_container a:first",
      itemSelector   : ".work_item",
  		debug		 	     : false,
      dataType	 	   : 'json',
      appendCallback : false,
      prefill        : true,
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
      $container.imagesLoaded().done(function( instance ) {
        $container.masonry({
            itemSelector : '.work_item',
            columnWidth : 168,
            isFitWidth : true,
            hiddenStyle : { opacity: 0, scale: 1 },
            visibleStyle : { opacity: 1, transform: 'scale(1)' }
          }).append($newElems).masonry('appended', $newElems)
          .masonry('on', 'layoutComplete', function(msnryInstance, laidOutItems) {
            Work.renderYearLineAfterRendering($newElems);
          });
      });
    }
  );
  
  $('.work_item').on('click', function(){
    PhotoViewer.launch($(this).attr('data-work-id'));
  });
});