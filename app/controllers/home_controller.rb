class HomeController < ApplicationController
  def index
    @films = Film.published
  end
  
  def contact
    if request.post?
      ContactMailer.send_message(params['email']).deliver
    end
  end
  
  def bio
    @bio_chinese = Page.page('bio chinese')
    @bio_engligh = Page.page('bio english')
    @sidebar     = Sidebar.one('Biography')
  end
  
  def news_and_contact
    @contact = Page.page('contact')
    @sidebar = Sidebar.one('News / Contact')
  end

end
