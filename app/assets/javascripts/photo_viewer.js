(function(){
  function PhotoViewer() {
    this.currentWorkElem = null;
    this.elemId          = "#photo_viewer";
    this.wrapperId       = "#photo_viewer_outer";
    this.prevBtnId       =  this.elemId + " .prev";
    this.nextBtnId       =  this.elemId + " .next";
  }
  
  PhotoViewer.prototype = {
    launch: function(workId) {
      var that = this;
      
      that.close();
      var viewer = $(that.template());
      $('body').append(viewer.hide());
      viewer.fadeIn();
      
      $(that.elemId + ' .prev').click(function(){
        that.prev();
      });
      
      $(that.elemId + ' .next').click(function(){
        that.next();
      });
      
      $(that.elemId + ' .close').click(function(){
        that.close();
      });
      
      var workElem = $('#work_'+workId);
      this.renderWork(workElem);
      
      $('#navigation').addClass('photo_viewer_launched');
    },
    
    close: function() {
      $('#navigation').removeClass('photo_viewer_launched');
      
      $(this.wrapperId).fadeOut(500, function() {
        $(this).remove();
      });
    },
    
    next: function() {
      var workElem = this.currentWorkElem.next();
      this.renderWork(workElem);
    },
    
    prev: function() {
      var workElem = this.currentWorkElem.prev();
      this.renderWork(workElem);
    },
    
    renderWork: function(workElem) {
      if (workElem.length === 1) {
        this.currentWorkElem = workElem;
        var imgSrc           = workElem.attr('data-img-src');
        var title            = workElem.attr('data-title');
        var desc             = workElem.attr('data-desc');
      
        $('#photo_viewer img').attr('src', imgSrc).hide().fadeIn();
        $('#photo_viewer .title').html(title);
        $('#photo_viewer .desc').html(desc);
        
        if (workElem.next().length > 0) {
          $(this.nextBtnId).show();
        } else {
          $(this.nextBtnId).hide();
        }
        
        if (workElem.prev().length > 0) {
          $(this.prevBtnId).show();
        } else {
          $(this.prevBtnId).hide();
        }
      }
    },
    
    template: function() {
      return ['<div id="photo_viewer_outer">',
                '<div id="photo_viewer" class="clear_fix">',
                  '<div class="image"><img src=""></div>',
                  '<div class="sidebar">',
                    '<div class="button close">X</div>',
                    '<div class="nav">',
                      '<button class="button prev">prev</button>',
                      '<button class="button next">next</button>',
                    '</div>',
                    '<div class="info">',
                      '<div class="title"></div>',
                      '<div class="desc"></div>',
                    '</div>',
                  '</div>',
                '</div>',
              '</div>'].join('');
    }
  }
  
  window.PhotoViewer = new PhotoViewer();
})(jQuery);