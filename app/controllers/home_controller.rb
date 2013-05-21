class HomeController < ApplicationController
  def index
    @works = Work.all.paginate(:per_page => 3, :page => params[:page])
  end
  
  def works_at_homepage
    @works = Work.all.paginate(:per_page => 3, :page => params[:page])
    
    respond_to do |format|
      format.json { render :json => @works }
    end
  end
  
  def work
    @works = Work.all.paginate(:per_page => 20, :page => params[:page])
  end
  
  def review
    @reviews = Review.all.paginate(:per_page => 6, :page => params[:page])
    
    respond_to do |format|
      
      format.html do
        @sidebar = Sidebar.one('Review')
        render :review
      end
      
      format.js
    end
  end
  
  def bio
    @bio_chinese = Page.page('bio chinese')
    @bio_engligh = Page.page('bio english')
    @sidebar     = Sidebar.one('Biography')
  end
  
  def news_and_contact
    @articles = Article.all.paginate(:per_page => 6, :page => params[:page])
    
    respond_to do |format|

      format.html do
        @contact  = Page.page('contact')
        @sidebar  = Sidebar.one('News / Contact')
        render :news_and_contact
      end

      format.js
    end
  end
  
  def slideshow
    @films = Film.published
  end
  
  def contact
    if request.post?
      ContactMailer.send_message(params['email']).deliver
    end
  end

end
