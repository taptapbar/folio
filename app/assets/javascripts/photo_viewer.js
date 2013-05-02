(function(){
  function PhotoViewer() {
    this.currentWorkElem = null;
    this.elemId = "#photo-viewer";
  }
  
  PhotoViewer.prototype = {
    launch: function(workId) {
      var that = this;
      
      that.close();
      $('body').append(that.template());
      
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
    },
    
    close: function() {
      $(this.elemId).remove();
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
      
        $('#photo-viewer img').attr('src', imgSrc);
      }
    },
    
    template: function(imgSrc) {
      return ['<div id="photo-viewer" class="clear_fix">',
                '<div class="image"><img src="', imgSrc, '"></div>',
                '<div class="sidebar">',
                  '<div class="button close">X</div>',
                  '<div class="nav">',
                    '<div class="button prev">prev</div>',
                    '<div class="button next">next</div>',
                  '</div>',
                '</div>',
              '</div>'].join('');
    }
  }
  
  window.PhotoViewer = new PhotoViewer();
})(jQuery);