$(function(){
  function Work() {
    var currentTime = new Date();
    var nextYear    = currentTime.getFullYear() + 1;
    this.currentYear = nextYear.toString();
  }

  Work.prototype = {
    template : function(work) {
      return [
        '<div id="work_', work.id, '" class="work_item" data-work-id="', work.id, '"', 
                                                       'data-year="', work.year, '"',
                                                       'data-img-src="', work.image_url_large, '"',
                                                       'data-title="', work.title, '"',
                                                       'data-desc="', work.description, '">',
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
      setTimeout(function() { that.renderYearLine(workItems); }, 300);
    }
  }
  window.Work = new Work();
});

$(function(){
  var $container = $('.work_items');
  var setting = {
    itemSelector : '.work_item',
    columnWidth : 168,
    isFitWidth : true,
    hiddenStyle : { opacity: 0, scale: 1 },
    visibleStyle : { opacity: 1, transform: 'scale(1)' }
  };
  
  $container.masonry(setting);
  $container.masonry('on', 'layoutComplete', function(msnryInstance, laidOutItems) {
    //console.log("layoutComplete");
    Work.renderYearLine($('.work_item'));
  });
  
  $container.imagesLoaded().done( function(instance) {
    $container.masonry();
  });
  
  $container.infinitescroll({
      navSelector    : "div.pagination_container",
      nextSelector   : "div.pagination_container a:first",
      itemSelector   : ".work_item",
  		debug		 	     : false,
      dataType	 	   : 'json',
      appendCallback : false,
      prefill        : true,
      bufferPx       : 600,
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
      
      if ($newElems.length > 0) {
        $newElems.imagesLoaded().done(function(instance) {
          $container.append($newElems).masonry('appended', $newElems).masonry();
        });
      }
    }
  );
  
  $(document).on('click', '.work_item', function(){
    PhotoViewer.launch($(this).attr('data-work-id'));
  });
});