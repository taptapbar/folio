jQuery(function($) {
  $('#works').infinitescroll({
    navSelector  : "div.pagination_container",
    nextSelector : "div.pagination_container a:first",
    itemSelector : "#works li",
		debug		 	   : true,
		dataType	 	 : 'html',
    loading      : {
      img        : '/images/admin/spinner.gif',
      finishedMsg: '',
      msgText    : ''
    },
		path: function(index) {
			return "works/?page="+index;
		}
  });
});