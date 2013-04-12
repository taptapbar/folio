class HomeController < ApplicationController
  def index
    
  end
  
  def work
    
  end
  
  def review
    @reviews = Review.all.paginate(:per_page => 6, :page => params[:page])
    @sidebar = Sidebar.one('Review')
  end
  
  def bio
    @bio_chinese = Page.page('bio chinese')
    @bio_engligh = Page.page('bio english')
    @sidebar     = Sidebar.one('Biography')
  end
  
  def news_and_contact
    @articles = Article.all.paginate(:per_page => 6, :page => params[:page])
    @contact  = Page.page('contact')
    @sidebar  = Sidebar.one('News / Contact')
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
