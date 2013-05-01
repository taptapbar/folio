jQuery(function($) {
  $('#works').infinitescroll({
    navSelector  : "div.pagination_container",
    nextSelector : "div.pagination_container a:first",
    itemSelector : "#works li",
		debug		 	   : false,
		dataType	 	 : 'html',
    bufferPx     : 1000,

    loading      : {
      img        : '/images/admin/spinner.gif',
      finishedMsg: '',
      msgText    : ''
    },
		path: function(index) {
			return "works/?page="+index;
		}
  });
  
  
  $(window).scroll(function() {
    var navCurrentWorkImg = $('#navigator .current-work img');
    var navPrevWorkImg    = $('#navigator .prev-work img');
    var navNextWorkImg    = $('#navigator .next-work img');
    
    var currentWorkImg  = $($("img:in-viewport")[0]);
    var currentWork     = currentWorkImg.parent();
    var prevWork        = currentWork.prev();
    var nextWork        = currentWork.next();
    
    // update current work image in navigator
    var currentWorkId   = currentWorkImg.attr('data-work-id');
    var currentThumbUrl = currentWorkImg.attr('data-thumb');
    navCurrentWorkImg.attr('src', currentThumbUrl)
                     .attr('data-work-id', currentWorkId);
    
    
    if (prevWork.length > 0) {
      if (prevWork.attr('id') === "infscr-loading") {
        prevWork = prevWork.prev();
      }
      var prevWorkImg  = prevWork.find('img');
      var prevWorkId   = prevWorkImg.attr('data-work-id');
      var prevThumbUrl = prevWorkImg.attr('data-thumb');
      navPrevWorkImg.show()
                    .attr('src', prevThumbUrl)
                    .attr('data-work-id', prevWorkId);
    } else {
      navPrevWorkImg.hide();
    }
    
    if (nextWork.length > 0) {
      if (nextWork.attr('id') === "infscr-loading") {
        nextWork = nextWork.next();
      }
      
      if (nextWork.length === 0) {
        navNextWorkImg.hide();
      } else {        
        var nextWorkImg  = nextWork.find('img');
        var nextWorkId   = nextWorkImg.attr('data-work-id');
        var nextThumbUrl = nextWorkImg.attr('data-thumb');
        navNextWorkImg.show()
                      .attr('src', nextThumbUrl)
                      .attr('data-work-id', nextWorkId);
      }
    } else {
      navNextWorkImg.hide();
    }
  });
  
  $("#navigator div").click(function(){
    var selectedWorkId = $(this).find('img').attr('data-work-id');
    $("html, body").animate({ scrollTop: $('#work_'+selectedWorkId).position().top }, 600);
  });
});