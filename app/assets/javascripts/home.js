jQuery(function($) {
  $('#works').infinitescroll({
      navSelector    : "div.pagination_container",
      nextSelector   : "div.pagination_container a:first",
      itemSelector   : "#works li",
  		debug		 	     : true,
  		dataType	 	   : 'json',
      bufferPx       : 1000,
      appendCallback : false,

      loading      : {
        img        : '/images/admin/spinner.gif',
        finishedMsg: '',
        msgText    : ''
      },
  		path: function(index) {
  			return "works_at_homepage.json/?page="+index;
  		}
    },
    function (data) {
      var newElementsHtml = ''; 
      for (var i=0; i < data.length; i++) {
        var work = data[i].work;
        newElementsHtml += Work.templateAtHomepage(work);
      }
      var $newElems = $(newElementsHtml);
      $('#works').append($newElems);
    }
  );
  
  
  function renderNavigator() {
    var navCurrentWorkImg = $('#navigator .current-work img');
    var navPrevWorkImg    = $('#navigator .prev-work img');
    var navNextWorkImg    = $('#navigator .next-work img');
    
    var currentWorkImg  = $($("img:in-viewport")[0]);
    var workBottomPos   = currentWorkImg.position().top + currentWorkImg.height();
    var topThreshold    = $(window).scrollTop() + 200; // 200 is $('#navigator').position().top
    if (workBottomPos < topThreshold) {
      currentWorkImg = $($("img:in-viewport")[1]);
    }
    
    var currentWork     = currentWorkImg.parent();
    var prevWork        = currentWork.prev();
    var nextWork        = currentWork.next();
    
    // update current work image in navigator
    var currentWorkId      = currentWorkImg.attr('data-work-id');
    var currentThumbUrl    = currentWorkImg.attr('data-thumb');
    var currentWorkCaption = currentWorkImg.attr('data-work-caption');
    navCurrentWorkImg.attr('src', currentThumbUrl)
                     .attr('data-work-id', currentWorkId);
    
    $('#work_caption').html(currentWorkCaption);
    
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
  };
  
  $(window).bind('scrollstart', function(e){
    $("#navigator").fadeOut();
    $('#work_caption').fadeOut();
  });
            
  $(window).bind('scrollstop', function(e){
    renderNavigator();
    $("#navigator").fadeIn(200, function(){
      var newTopPos = 200 + $("#navigator .current-work").position().top;
      $('#work_caption').fadeIn(200).css({top: newTopPos});
    });
  });
  
  $("#navigator div").click(function(){
    var selectedWorkId = $(this).find('img').attr('data-work-id');
    $("html, body").animate({ scrollTop: $('#work_'+selectedWorkId).position().top }, 600);
  });
});